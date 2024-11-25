import { useRef } from "react";
import { Container } from "react-bootstrap";
import "./Header.css";
import { NavLink, useLocation } from "react-router-dom";
import bars from "../../assets/Images/bars.svg";
export default function Header() {
  const userId = new URLSearchParams(useLocation().search).get("userId");
  const token = new URLSearchParams(useLocation().search).get("token");
  const ref = useRef();
  const handleRef = () => ref.current.classList.toggle("header-ul-active");
  return (
    <header className="py-3">
      <Container className="d-flex align-items-center justify-content-between">
        <ul className="d-flex" ref={ref}>
          <li>
            <NavLink
              to="/landing"
              style={({ isActive }) => {
                return { color: isActive ? "#5ED8A5" : "#fff" };
              }}
            >
              الرئيسية
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/GreenDefendDashboard/Diagnosis"
              style={({ isActive }) => {
                return { color: isActive ? "#5ED8A5" : "#fff" };
              }}
            >
              التشخيص
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/GreenDefendDashboard/Forum`}
              style={({ isActive }) => {
                return { color: isActive ? "#5ED8A5" : "#fff" };
              }}
            >
              المنتدى
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/GreenDefendDashboard/Profile`}
              style={({ isActive }) => {
                return { color: isActive ? "#5ED8A5" : "#fff" };
              }}
            >
              الملف الشخصي
            </NavLink>
          </li>
        </ul>
        <div className="toggle" onClick={handleRef}>
          <img src={bars} alt="" />
        </div>
        <h1 id="unique-head" className="mb-0">
          Green<span>Defend</span>
        </h1>
      </Container>
    </header>
  );
}
