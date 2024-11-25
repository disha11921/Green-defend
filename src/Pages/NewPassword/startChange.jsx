import { useState } from "react";
import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { SendForgetPasswordOTP } from "./api";
import errorIcon from "../../assets/Images/error.svg";

export const StartChange = () => {
  const [userData, setUserData] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const field = document.querySelector("form input");
    const small = document.querySelector("form small");

    if (/\w+.gmail.com/.test(field.value) === false || !field.value) {
      hasError = true;
      field.classList.add("error-input");
      small.classList.remove("opacity-0");
    } else {
      field.classList.remove("error-input");
      small.classList.add("opacity-0");
    }

    if (!hasError) {
      setLoading(true);
      setError(null);

      const response = await SendForgetPasswordOTP(userData, userData.email);

      setLoading(false);

      if (response.status === 200) {
        navigate(`/passwordcode?Email=${userData.email}`);
      } else {
        const data = await response.json();
        console.error("Error:", data);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    const fieldContainer = e.currentTarget.closest(".field");
    const smallElement = fieldContainer.querySelector("small");
    smallElement.classList.add("opacity-0");
    e.currentTarget.classList.remove("error-input");
  };
  return (
    <section className="new-password authentication-form">
      <Container>
        <h1 id="unique-head">
          Green<span>Defend</span>
        </h1>
        <form action="#" onSubmit={handleSubmit} className="authentication">
          <h2 className="text-end mb-5 fw-bold">نسيت كلمة المرور</h2>
          <div className="field">
            <input
              type="text"
              autoComplete="off"
              name="email"
              dir="rtl"
              onChange={handleChange}
            />
            <span>البريد الاكتروني</span>
            <small className="text-danger d-flex gap-2 align-items-center opacity-0">
              <img src={errorIcon} alt="" /> قيمة غير صالحة
            </small>
          </div>
          <button type="submit" className="btn btn-success py-2 w-100">
            {loading ? "جاري التحميل..." : "التالي"}
          </button>
        </form>
      </Container>
    </section>
  );
};
