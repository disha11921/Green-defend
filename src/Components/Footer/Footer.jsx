import instagram from "../../assets/Images/instagram.png";
import twitter from "../../assets/Images/twitter.png";
import facebook from "../../assets/Images/facebook.png";
import "./Footer.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Footer() {
  return (
    <footer>
      <Container>
        <h2>جرين ديفيند</h2>
        <ul>
          <li>
            <Link to="/GreenDefendDashboard/Profile">الملف الشخصي</Link>
          </li>
          <li>
            <Link to="/GreenDefendDashboard/Forum">المنتدى</Link>
          </li>
          <li>
            <Link to="/GreenDefendDashboard/Diagnosis">التشخيص</Link>
          </li>
          <li>
            <Link to="/landing">الرئيسية</Link>
          </li>
        </ul>
        <p>
          نظام الكشف الذكي عن أمراض النباتات ودعم الزراعة: منصة تستخدم الذكاء
          الصناعي لتحديد سريع لأمراض النباتات، توفر دعمًا شاملاً للمزارعين،
          وتسهل تبادل المعرفة لتحسين ممارسات الزراعة
        </p>
        <ul>
          <li>
            <Link to="https://www.instagram.com" target="_blank">
              <img src={instagram} alt="" />
            </Link>
          </li>
          <li>
            <Link to="https://www.twitter.com" target="_blank">
              <img src={twitter} alt="" />
            </Link>
          </li>
          <li>
            <Link to="https://www.facebook.com" target="_blank">
              <img src={facebook} alt="" />
            </Link>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
