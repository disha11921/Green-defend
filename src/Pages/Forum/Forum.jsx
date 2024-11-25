import React, { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { GetPosts } from "./GetPostsAPI";
import "./Forum.css";
import { useLocation, useNavigate } from "react-router-dom";
import UserPost from "./UserPost";

export default function Forum() {
  const navigate = useNavigate();

  const [userPost, setUserPost] = useState([]);
  useEffect(() => {
    const handleGetPosts = async () => {
      const response = await GetPosts();
      const data = await response.json();
      setUserPost(data);
    };
    handleGetPosts();
  }, []);
  const location = useLocation();
  return (
    <>
      <button
        className="rounded-pill ask mb-3"
        onClick={() => navigate(`${location.pathname}/AddPost`)}
      >
        اسأل المجتمع ؟
      </button>
      {userPost ? (
        userPost.map((value) => (
          <UserPost
            key={value.postId}
            name={value.userName}
            time={value.createdAt.substr(0, 10)}
            imageSrc={value.userImageURL}
            postContent={value.postValue}
            commentsCount={value.commentsCount}
            PostId={value.postId}
            postImageURL={value.postImageURL}
          />
        ))
      ) : (
        <Spinner animation="border" role="status" variant="success" />
      )}
    </>
  );
}
