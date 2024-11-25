import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./NewAccount.css";
import { createUser } from "./api";
import errorIcon from "../../assets/Images/error.svg";

export const NewAccount = () => {
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const smalls = document.querySelectorAll(".field small");
    const inputs = document.querySelectorAll(".field input");
    smalls[Array.from(inputs).indexOf(e.target)].classList.add("opacity-0");
    e.target.classList.remove("error-input");
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const smalls = document.querySelectorAll(".field small");
    const inputs = document.querySelectorAll(".field input");
    // Validate inputs
    if (!userData.fullName) {
      hasError = true;
      smalls[0].classList.remove("opacity-0");
      inputs[0].classList.add("error-input");
    } else {
      smalls[0].classList.add("opacity-0");
      inputs[0].classList.remove("error-input");
    }

    if (!/\w+@gmail\.com/.test(userData.email)) {
      hasError = true;
      smalls[1].classList.remove("opacity-0");
      inputs[1].classList.add("error-input");
    } else {
      smalls[1].classList.add("opacity-0");
      inputs[1].classList.remove("error-input");
    }

    if (
      userData.password.length < 4 ||
      userData.password !== userData.confirmPassword
    ) {
      hasError = true;
      smalls[2].classList.remove("opacity-0");
      inputs[2].classList.add("error-input");
      inputs[3].classList.add("error-input");
      smalls[3].classList.remove("opacity-0");
    } else {
      smalls[2].classList.add("opacity-0");
      inputs[2].classList.remove("error-input");
      inputs[3].classList.remove("error-input");
      smalls[3].classList.add("opacity-0");
    }

    if (!hasError) {
      setLoading(true);
      setError(null);

      const response = await createUser(userData);

      setLoading(false);

      if (response.status === 200) {
        navigate(`/verificationcode?email=${userData.email}`);
      } else {
        const data = await response.json();
        console.error("Error:", data);
        setError(data?.message || "Registration failed");
      }
    }
  };

  return (
    <>
      <section className="new-account authentication-form">
        <Container>
          <h1 className="fw-bolder text-center">إنشاء حساب جديد</h1>
          <h3 className="text-secondary text-center mt-4">
            أدخل البيانات المطلوبة بالأسفل
          </h3>
          {error && <div className="alert alert-danger">{error}</div>}
          <form
            className="text-end authentication"
            id="form"
            onSubmit={handleSubmit}
          >
            <div className="field">
              <input
                type="text"
                name="fullName"
                autoComplete="off"
                value={userData.fullName}
                onChange={handleInputChange}
              />
              <span>اسم المستخدم</span>
              <small className="opacity-0">
                <img src={errorIcon} alt="" /> قيمة غير صحيحة
              </small>
            </div>
            <div className="field">
              <input
                type="text"
                name="email"
                autoComplete="off"
                value={userData.email}
                onChange={handleInputChange}
              />
              <span>البريد الإلكتروني</span>
              <small className="opacity-0">
                <img src={errorIcon} alt="" /> قيمة غير صحيحة
              </small>
            </div>
            <p className="text-secondary">
              <bdi>GreenDefend </bdi>أوافق على جميع العروض من تطبيق
              <input
                style={{
                  width: "20px",
                  height: "20px",
                  marginLeft: "10px",
                  cursor: "pointer",
                }}
                type="checkbox"
                name="check"
                id="check"
                required
              />
            </p>
            <div className="field">
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleInputChange}
              />
              <span>كلمة المرور</span>
              <small className="opacity-0">
                <img src={errorIcon} alt="" /> قيمة غير صحيحة
              </small>
            </div>
            <div className="field">
              <input
                type="password"
                name="confirmPassword"
                value={userData.confirmPassword}
                onChange={handleInputChange}
              />
              <span>تأكيد كلمة المرور</span>
              <small className="opacity-0">
                <img src={errorIcon} alt="" /> قيمة غير صحيحة
              </small>
            </div>
            <button type="submit" className="btn btn-success py-2 col-12 mt-3">
              {loading ? "جار التسجيل ..." : "إنشاء حساب"}
            </button>
          </form>
        </Container>
      </section>
    </>
  );
};
