import React, { useEffect, useState } from "react";
import "./Profile.css";
import DiagnosticTips from "../../assets/Images/profile_image.jpg";
import { Link } from "react-router-dom";
import start from "../../assets/Images/start.png";
import { userId } from "../../constants";
import { defaultImgUrl } from "../../Components/Columns/ColumnTwo";
import star from "../../assets/Images/star.svg";
const sourceImage =
  "https://images.unsplash.com/photo-1615109398623-88346a601842?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fG1hbnxlbnwwfHwwfHx8MA%3D%3D";

export default function Profile() {
  const [userImage, setUserImage] = useState("");
  useEffect(() => {
    const getImage = async (api) => {
      const response = await fetch(api);
      const data = await response.json();
      if (!data.imageUrl) {
        setUserImage(defaultImgUrl);
      } else {
        setUserImage(data.imageUrl);
      }
      // console.log(data);
    };
    getImage(
      `https://greendefined.runasp.net/api/Account/GetUserData?userId=${userId}`
    );
  }, []);
  console.log();
  return (
    <>
      <figure className="parent_images">
        {userImage ? (
          <img src={userImage} alt="" />
        ) : (
          <img src={sourceImage} alt="" />
        )}
        <img src={DiagnosticTips} className="img-fluid" height="250" alt="" />
      </figure>
      <section className="app-user common-style">
        <article>
          <div className="text">
            <h3>مستخدم التطبيق</h3>
            <p>أعط نفسك نبذة عن التطبيق</p>
            <Link
              to={`/GreenDefendDashboard/Profile/editprofile`}
              className="bg-success rounded-pill profile-button"
            >
              تعديل
            </Link>
          </div>
          <div className="image">
            {userImage ? (
              <img src={userImage} alt="" />
            ) : (
              <img src={sourceImage} alt="" />
            )}
          </div>
        </article>
      </section>
      <hr />
      <section className="feature common-style">
        <article>
          <div className="text">
            <h3>عالج نباتك بأمان مع مزارعي العالم</h3>
            <p>
              شارك جرين دفند مع أصدقائك وساعد في تطوير الزارعة وحماية النبات
            </p>
          </div>
          <figure className="mb-0">
            <img src={start} alt="" />
          </figure>
        </article>
        <Link to="" className="bg-success rounded-pill profile-button">
          شارك جرين ديفيند
        </Link>
      </section>
      <hr />
      <section className="download common-style">
        <article>
          <div className="text">
            <h3>قم بتقييم تطبيق جرين دفند</h3>
            <p>نريد سماع أفكارك واقتراحاتك</p>
          </div>
          <img src={star} alt="" />
        </article>
        <Link to="" className="bg-success rounded-pill profile-button mt-3">
          اترك تقييما
        </Link>
      </section>
    </>
  );
}
