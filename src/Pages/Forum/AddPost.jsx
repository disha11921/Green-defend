import { useLocation, useNavigate } from "react-router-dom";
import ColumnOne from "../../Components/Columns/ColumnOne";
import ColumnTwo from "../../Components/Columns/ColumnTwo";
import Footer from "../../Components/Footer/Footer";
import "./Forum.css";
import { Button } from "react-bootstrap";
import { useState } from "react";
import { AddPostAPI } from "./AddPostAPI";
import { userId } from "../../constants";

export default function AddPost() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const [postData, setPostData] = useState({
    userId: userId,
    PostValue: "",
    PostImage: null,
  });
  const [imagePreview, setImagePreview] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("userId", postData.userId);
    formData.append("PostValue", postData.PostValue);
    if (postData.PostImage) {
      formData.append("PostImage", postData.PostImage);
    }

    try {
      const response = await AddPostAPI(formData);
      setLoading(false);
      navigate(`/GreenDefendDashboard/Forum`);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "PostImage") {
      const file = files[0];
      setPostData({
        ...postData,
        PostImage: file,
      });
      setImagePreview(URL.createObjectURL(file));
    } else {
      setPostData({
        ...postData,
        [name]: value,
      });
    }
  };

  return (
    <>
      <form id="addPost" className="p-0 mt-3" onSubmit={handleSubmit}>
        <label
          className="d-flex p-5 mb-3 text-center text-secondary justify-content-center align-items-center"
          style={{
            border: "1px solid rgba(0, 0, 0, 1)",
            borderRadius: "15px",
            cursor: "pointer",
            position: "relative",
            height: "300px",
          }}
        >
          أضف صورة
          <input
            type="file"
            name="PostImage"
            className="my-3 w-100 bg-white p-2"
            style={{ cursor: "pointer", display: "none" }}
            onChange={handleChange}
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              style={{
                position: "absolute",
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
                borderRadius: "15px",
                objectFit: "cover",
              }}
            />
          )}
        </label>
        <div
          className="question mb-3"
          style={{
            backgroundColor: "rgba(228, 240, 233, 1)",
            padding: "48px",
            borderRadius: "15px",
          }}
        >
          <h3 className="mt-0">اسال المجتمع وتلقي اجابات من خبراء</h3>
          <input
            type="text"
            name="PostValue"
            className="d-block my-3 border-0 p-2 w-100 bg-white"
            style={{ outline: "none" }}
            required
            autoComplete="off"
            onChange={handleChange}
          />
        </div>
        <Button
          variant="success"
          type="submit"
          className="mx-auto d-block px-5"
        >
          {loading ? "جاري التحميل..." : "اضافة"}
        </Button>
      </form>
    </>
  );
}
