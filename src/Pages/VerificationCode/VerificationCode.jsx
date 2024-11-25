import { useState } from "react";
import { Container } from "react-bootstrap";
import "./VerificationCode.css";
import { confirmAccount } from "./api";
import { useLocation, useNavigate } from "react-router-dom";

export const VerificationCode = () => {
  const [verificationCode, setVerificationCode] = useState(["", "", "", ""]); // Array to hold 4 verification code digits
  const [loading, setLoading] = useState(false); // Loading state for API call
  const [error, setError] = useState(null); // Error state for API call
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const userEmail = queryParams.get("email");
  const navigate = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length <= 1 && /\d*/.test(value)) {
      const newVerificationCode = [...verificationCode];
      newVerificationCode[index] = value;
      setVerificationCode(newVerificationCode);

      // Move focus to the next input if current input has a valid value
      if (value.length === 1 && index < 3) {
        document.getElementById(`input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all 4 digits are entered
    if (verificationCode.some((digit) => digit === "")) {
      setError("Please enter 4 digits for verification code");
      return;
    }

    const code = verificationCode.join(""); // Join array elements into a single string

    setLoading(true);
    setError(null);

    try {
      // Replace with actual API endpoint
      const response = await confirmAccount({ userEmail, code });

      console.log(response);

      // Handle response
      if (response.status === 200) {
        // Handle success
        // Navigate to success page
        navigate("/newaccountdone");
      } else {
        setError("Verification failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setError(error.message || "Failed to send verification code");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="verification-code">
        <Container>
          <h1 className="fw-bolder text-center mt-3">إنشاء حساب جديد</h1>
          <h3 className="text-secondary text-center my-4">
            أدخل الرمز المرسل إلى البريد الإلكتروني
          </h3>
          <form onSubmit={handleSubmit} className="d-flex flex-column gap-5">
            <fieldset className="d-flex justify-content-between">
              {verificationCode.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  id={`input-${index}`}
                  value={digit}
                  onChange={(e) => handleChange(e, index)}
                  maxLength="1"
                  autoFocus={index === 0}
                />
              ))}
            </fieldset>
            <button
              type="submit"
              className="w-100 d-block mt-3 form-button py-2 btn btn-success"
            >
              إرسال
            </button>
          </form>
          {error && <div className="alert alert-danger mt-3">{error}</div>}
          {loading && <div className="text-center mt-3">Loading...</div>}
        </Container>
      </section>
    </>
  );
};
