import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import facebook from "../../assets/Images/facebook-logo.svg";
import apple from "../../assets/Images/apple-logo.svg";
import google from "../../assets/Images/google-logo.svg";
import "./Login.css";
import { useState } from "react";
import { LoginApi } from "./api";
import errorIcon from "../../assets/Images/error.svg";

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    const inputs = document.querySelectorAll(".field input");
    const smalls = document.querySelectorAll(".field small");
    e.preventDefault();
    let hasError = false;

    if (!userData.email) {
      hasError = true;
      inputs[0].classList.add("error-input");
      smalls[0].classList.remove("opacity-0");
    } else {
      inputs[0].classList.remove("error-input");
      smalls[0].classList.add("opacity-0");
    }

    if (userData.password.length < 4 || userData.password === "") {
      hasError = true;
      inputs[1].classList.add("error-input");
      smalls[1].classList.remove("opacity-0");
    } else {
      inputs[1].classList.remove("error-input");
      smalls[1].classList.add("opacity-0");
    }

    if (!hasError) {
      setLoading(true);
      setError(null);

      try {
        const response = await LoginApi(userData);

        setLoading(false);

        if (response.status === 200) {
          // Assuming response.json() gives the correct response body
          const data = await response.json();
          if (data) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userId", data.userId);
          }
          navigate(`/landing`);
        } else {
          const responseText = await response.text();
          let data;
          try {
            data = JSON.parse(responseText);
          } catch {
            data = responseText;
          }

          if (typeof data === "string") {
            setError(data);
          } else if (typeof data === "object") {
            setError(data?.message || "خطأ في التسجيل");
          }
        }
      } catch (err) {
        setLoading(false);
        setError("هناك خطأ حصل أثناء التسجيل, رجاء حاول مجددا");
      }
    }
  };

  const handleChange = async (e) => {
    const fieldContainer = e.currentTarget.closest(".field");
    const smallElement = fieldContainer.querySelector("small");
    smallElement.classList.add("opacity-0");
    e.currentTarget.classList.remove("error-input");
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
    console.log(userData);
  };
  return (
    <section className="login authentication-form">
      <div className="d-flex justify-content-center align-items-center">
        <Container>
          <h1 id="unique-head" className="mb-0">
            Green<span>Defend</span>
          </h1>
          <form
            action="#"
            onSubmit={handleSubmit}
            className="d-flex flex-column row-gap-3 authentication"
          >
            <div className="field position-relative">
              <input
                id="email"
                name="email"
                type="text"
                autoComplete="off"
                placeholder="البريد الالكتروني"
                onChange={handleChange}
              />
              <small className="opacity-0">
                {" "}
                <img src={errorIcon} width={24} alt="" /> قيمة غير صحيحة
              </small>
            </div>
            <div className="field position-relative">
              <input
                id="password"
                name="password"
                type="password"
                placeholder="كلمة المرور"
                onChange={handleChange}
              />
              <small className="opacity-0">
                {" "}
                <img src={errorIcon} width={24} alt="" /> قيمة غير صحيحة
              </small>
            </div>
            <div className="setting">
              <label className="text-secondary">
                <input type="checkbox" />
                تذكرني
              </label>
              <Link
                to="/startChange"
                className="text-decoration-none text-secondary"
              >
                تغيير كلمة المرور
              </Link>
            </div>
            <div className="submits">
              <div className="buttons d-flex flex-column row-gap-3">
                <button type="submit" className="submit btn btn-success py-2">
                  {loading ? "جاري التسجيل ...." : "تسجيل الدخول"}
                </button>
                <Link
                  to="/newaccount"
                  className="newAccount btn btn-outline-success py-2"
                >
                  إنشاء حساب
                </Link>
                {error && (
                  <div className="alert alert-danger mt-3 position-absolute">
                    {error}
                  </div>
                )}
              </div>
              {/* <p className="text-center text-secondary mt-4">أو من خلال</p>
              <div className="socials d-flex justify-content-center column-gap-3">
                <Link to="https://www.facebook.com" target="_blank">
                  <img src={facebook} alt="" />
                </Link>
                <Link to="https://www.apple.com" target="_blank">
                  <img src={apple} alt="" />
                </Link>
                <Link to="https://www.google.com" target="_blank">
                  <img src={google} alt="" />
                </Link>
              </div> */}
            </div>
          </form>
        </Container>
      </div>
    </section>
  );
};
