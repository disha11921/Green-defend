import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AddingNewPassword } from "./api";
import errorIcon from "../../assets/Images/error.svg";

export default function PasswordChange() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  console.log(userData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const field = document.querySelectorAll("form input");
    const small = document.querySelectorAll("form small");
    if (!/\w+@gmail\.com/.test(field[0].value) || !field[0].value) {
      field[0].classList.add("error-input");
      small[0].classList.remove("opacity-0");
      hasError = true;
    }
    if (
      !field[1].value ||
      !field[2].value ||
      field[1].value.length < 4 ||
      field[2].value.length < 4 ||
      field[1].value !== field[2].value
    ) {
      field[1].classList.add("error-input");
      small[1].classList.remove("opacity-0");
      field[2].classList.add("error-input");
      small[2].classList.remove("opacity-0");
      hasError = true;
    }

    if (!hasError) {
      setLoading(true);
      setError(false);

      const response = await AddingNewPassword(userData);

      setLoading(false);

      if (response.status === 200) {
        navigate("/login");
        console.log(true);
      } else {
        let data;
        try {
          data = await response.clone().json();
        } catch (error) {
          data = await response.clone().text();
        } finally {
          setLoading(false);
        }
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
              onChange={handleChange}
            />
            <span>البريد الاكتروني</span>
            <small className="text-danger d-flex gap-2 align-items-center opacity-0">
              <img src={errorIcon} alt="" /> قيمة غير صالحة
            </small>
          </div>
          <div className="field">
            <input type="password" name="password" onChange={handleChange} />
            <span>كلمة المرور</span>
            <small className="text-danger d-flex gap-2 align-items-center opacity-0">
              <img src={errorIcon} alt="" /> قيمة غير صالحة
            </small>
          </div>
          <div className="field">
            <input
              type="password"
              name="confirmPassword"
              onChange={handleChange}
            />
            <span>تأكيد كلمة المرور</span>
            <small className="text-danger d-flex gap-2 align-items-center opacity-0">
              <img src={errorIcon} alt="" /> قيمة غير صالحة
            </small>
          </div>
          <button type="submit" className="btn btn-success py-2 w-100">
            {loading ? "جاري التحميل..." : "التالي"}
          </button>
          {error ? <Alert variant="danger text-center">{error}</Alert> : null}
        </form>
      </Container>
    </section>
  );
}
