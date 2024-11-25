import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { userId } from "../../constants";
import { Spinner } from "react-bootstrap";
import close from "../../assets/Images/close.svg";

const links = [
  { link: "الرئيسية", path: "/landing" },
  { link: "التشخيص", path: "/GreenDefendDashboard/Diagnosis" },
  { link: "الطقس", path: "/GreenDefendDashboard/Wheather" },
  { link: "المنتدى", path: `/GreenDefendDashboard/Forum?userId=${userId}` },
  {
    link: "الملف الشخصي",
    path: `/GreenDefendDashboard/Profile?userId=${userId}`,
  },
  { link: "نصائح التشخيص", path: "/GreenDefendDashboard/DiagnosticTips" },
  { link: "معلومات المحاصيل", path: "/GreenDefendDashboard/CropInformation" },
  { link: "مراقبة النبات", path: "/GreenDefendDashboard/PlantMonitoring" },
];
export const defaultImgUrl =
  "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg";

export default function ColumnTwo() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const twoRef = useRef();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.split("/")[1] === "GreenDefendDashboard") {
      const columnTwoFunction = () => {
        window.innerWidth >= 992
          ? twoRef.current.classList.remove("move-to-right")
          : twoRef.current.classList.add("move-to-right");
      };
      window.addEventListener("resize", columnTwoFunction);
      window.addEventListener("load", columnTwoFunction);
    }
    const getData = async (api) => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData(
      `https://greendefined.runasp.net/api/Account/GetUserData?userId=${userId}`
    );
  }, []);
  const handleClose = (e) => {
    twoRef.current.classList.add("move-to-right");
  };
  return (
    <>
      <div className="column two move-to-right" ref={twoRef}>
        <button
          className="close bg-transparent"
          style={{ border: "0", cursor: "pointer" }}
          onClick={handleClose}
        >
          <img src={close} width={24} alt="" />
        </button>
        <div className="head">
          {loading ? (
            <Spinner animation="border" />
          ) : (
            <>
              <img
                src={data.imageUrl || defaultImgUrl}
                alt="DiagnosticTips"
                width={70}
                height={70}
                className="rounded-circle"
              />
              <h3 className="fw-normal" style={{ fontSize: "30px" }}>
                {data.fullName}
              </h3>
              <small className="text-secondary">{data.country || "مصر"}</small>
            </>
          )}
        </div>
        <ul>
          {links.map((value, index) => (
            <li key={index}>
              <NavLink to={value.path}>{value.link}</NavLink>
            </li>
          ))}
        </ul>
        <button className="rounded-pill download-button">تنزيل التطبيق</button>
      </div>
    </>
  );
}
