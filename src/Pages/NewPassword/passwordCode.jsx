import React, { useState } from "react";
import { Alert, Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckForgetPasswordOTP } from "./api";
import errorIcon from "../../assets/Images/error.svg";

export default function PasswordCode() {
  const [userData, setUserData] = useState({ code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const location = useLocation();
  const URL = new URLSearchParams(location.search);
  const email = URL.get("Email");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;
    const field = document.querySelector(".field input");
    const small = document.querySelector(".field small");
    if (
      field.value === "" ||
      field.value.length !== 6 ||
      Boolean(Number(field.value)) === false
    ) {
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

      const response = await CheckForgetPasswordOTP(
        userData,
        email,
        field.value
      );

      setLoading(false);

      if (response.status === 200) {
        navigate(`/newPassword?Email=${email}&Code=${field.value}`);
      } else {
        let data;
        try {
          data = await response.clone().json();
        } catch (e) {
          data = await response.clone().text();
        }

        if (typeof data === "object") {
          setError(data.message || "Error in Code");
        } else {
          setError(data);
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
    <>
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
              <span>اكتب الكود</span>
              <small
                dir="rtl"
                className="text-danger d-flex gap-2 align-items-center opacity-0"
              >
                <img src={errorIcon} alt="" /> قيمة غير صالحة
              </small>
            </div>
            <button type="submit" className="btn btn-success py-2 w-100">
              {loading ? "جاري التحميل" : "التالي"}
            </button>

            {error ? (
              <Alert
                variant="danger text-center"
                style={{ marginLeft: "-1rem", width: "100%" }}
              >
                {error}
              </Alert>
            ) : null}
          </form>
        </Container>
      </section>
    </>
  );
}
