import { defaultImgUrl } from "../../../Components/Columns/ColumnTwo";
import { useEffect, useState } from "react";
import Profile from "../../../assets/Images/profile_image.jpg";
import "./EditProfile.css";
import { token, userId } from "../../../constants";
import { Spinner, Button } from "react-bootstrap";

export default function EditProfile() {
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormDataState] = useState({
    id: "",
    FullName: "",
    Bio: "",
    Country: "",
    ProfileImage: null,
  });

  useEffect(() => {
    const getData = async (api) => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setData(data);
        setFormDataState({
          id: data.userId,
          FullName: data.fullName,
          Bio: data.bio,
          Country: data.country,
          ProfileImage: null,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };
    getData(
      `https://greendefined.runasp.net/api/Account/GetUserData?userId=${userId}`
    );
    // Get User Data Request
    const getUserData = async (api) => {
      try {
        const response = await fetch(api);
        const data = await response.json();
        setUserData(data);
        console.log(data);
      } catch (error) {
        console.error("Error", error);
      }
    };
    getUserData(
      `https://greendefined.runasp.net/api/Account/GetUserData?userId=${userId}`
    );
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    console.log(e.target);
    if (name === "ProfileImage") {
      setFormDataState({
        ...formData,
        ProfileImage: files[0],
      });
    } else {
      setFormDataState({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    const url = "https://greendefined.runasp.net/api/Account/EditProfile";
    const form = new FormData();
    form.append("id", formData.id);
    form.append("FullName", formData.FullName);
    form.append("Bio", formData.Bio);
    form.append("Country", formData.Country);
    if (formData.ProfileImage) {
      form.append("ProfileImage", formData.ProfileImage);
    }

    try {
      const response = await fetch(url, {
        method: "Post",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      });

      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        alert("Error updating Profile.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error updating Profile.");
    } finally {
      setSaving(false);
    }
  };
  return (
    <>
      <figure className="parent_images">
        <img src={userData.imageUrl || defaultImgUrl} alt="Logo" />
        <img src={Profile} className="img-fluid" height="250" alt="" />
      </figure>
      {loading ? (
        <Spinner
          animation="border"
          variant="success"
          className="position-absolute"
          style={{ top: `calc(50% + 100px)`, left: "50%" }}
        />
      ) : (
        <form action="" id="EditProfile" onSubmit={handleSubmit}>
          <div>
            <label>أدخل اسمك</label>
            <input
              onChange={handleChange}
              type="text"
              name="FullName"
              placeholder="اسمك"
              autoComplete="off"
            />
          </div>
          <div>
            <label>عرف نفسك للاخرين</label>
            <input
              onChange={handleChange}
              type="text"
              name="Bio"
              placeholder="عرف نفسك للاخرين"
              autoComplete="off"
            />
          </div>
          <div>
            <label>البلد</label>
            <input
              onChange={handleChange}
              type="text"
              name="Country"
              placeholder="البلد"
              autoComplete="off"
            />
          </div>
          <div>
            <label>الصورة</label>
            <input
              onChange={handleChange}
              type="file"
              name="ProfileImage"
              placeholder="البلد"
            />
          </div>
          <Button variant="success" type="submit" disabled={saving}>
            {saving ? "حفظ..." : "جاري الحفظ"}
          </Button>
        </form>
      )}
    </>
  );
}
