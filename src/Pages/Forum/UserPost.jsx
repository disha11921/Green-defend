import React, { useState, useEffect } from "react";
import { userId } from "../../constants";
import { GetPostDetail } from "./GetPostDetail";
import UserComment from "./UserComment";
import { Button } from "react-bootstrap";
import { AddCommentAPI } from "./AddCommentApi";
import { AddReactAPI } from "./AddReact";
import defaultImage from "../../assets/Images/default.png";
import likeIcon from "../../assets/Images/like.svg";
import dislike from "../../assets/Images/dislike.svg";
import comment from "../../assets/Images/comment.svg";

export default function UserPost({
  name,
  time,
  country,
  imageSrc,
  postContent,
  commentsCount,
  PostId,
  postImageURL,
}) {
  const [comments, setComments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
  const [like, setLike] = useState();
  const [disLike, setDisLike] = useState();
  const [likeActive, setLikeActive] = useState(false);
  const [disLikeActive, setDisLikeActive] = useState(false);
  const [addPost, setAddPost] = useState({
    comment: "",
    userId: userId,
    postId: PostId,
  });
  const [addReact, setAddReact] = useState({
    upOrDown: true,
    userID: userId,
    postID: PostId,
  });
  const [showComments, setShowComments] = useState(false);
  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const response = await GetPostDetail(PostId);
        const data = await response.json();
        setComments(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostDetails();
  }, [PostId]); // Fetch post details initially and whenever PostId changes

  const handleLike = async () => {
    try {
      setLikeLoading(true);
      await AddReactAPI({ ...addReact, upOrDown: true });
      // After successfully reacting, fetch updated post details
      fetchPostDetails();
    } catch (error) {
      console.error("Error liking post:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleDisLike = async () => {
    try {
      setLikeLoading(true);
      await AddReactAPI({ ...addReact, upOrDown: false });
      // After successfully reacting, fetch updated post details
      fetchPostDetails();
    } catch (error) {
      console.error("Error disliking post:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  const handleClick = () => {
    setShowComments(true); // Show comments when clicking on comments icon
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      await AddCommentAPI(addPost);
      setAddPost({ ...addPost, comment: "" });

      // After successfully adding comment, fetch updated comments
      fetchPostDetails();
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setAddPost({
      ...addPost,
      [name]: value,
    });
  };

  const fetchPostDetails = async () => {
    try {
      const response = await GetPostDetail(PostId);
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <article className="post">
      <div
        className="background"
        style={{
          backgroundImage: `url(${postImageURL})`,
          backgroundSize: "100% 100%",
        }}
      ></div>
      <div className="body">
        <div className="head">
          <div className="text">
            <span className="user">{name}</span>
            <span className="country">{country}</span>
            <span className="duration text-secondary">{time}</span>
          </div>
          <div className="image">
            <img src={imageSrc || defaultImage} className="user-image" alt="" />
          </div>
        </div>
        <article>
          <p className="my-3">{postContent}</p>
        </article>
        <div className="settings">
          <button
            dir="rtl"
            onClick={handleClick}
            className="comments-number bg-transparent border-0 d-flex align-items-center gap-2"
          >
            {commentsCount} ردود
            <img src={comment} alt="" width={32} />
          </button>
          <div className="likes d-flex align-items-center gap-3" dir="rtl">
            <button
              onClick={handleLike}
              className="like d-inline-flex align-items-center gap-2 mb-0 bg-transparent border-0 ms-3"
              style={{ cursor: "pointer" }}
              type="button"
              disabled={likeLoading}
            >
              <img src={likeIcon} width={32} alt="" className="ms-1" />
              أعجبني {comments?.likesCount}
            </button>
            <button
              onClick={handleDisLike}
              className="dislike d-inline-flex align-items-center gap-2 mb-0 bg-transparent border-0"
              style={{ cursor: "pointer" }}
              disabled={likeLoading}
            >
              <img src={dislike} width={32} alt="" className="ms-1" />
              لم يعجبني {comments?.disLikesCount}
            </button>
          </div>
        </div>
        <hr />
        {showComments && <></>}
      </div>
      {showComments &&
        comments?.comments.map((value) => (
          <UserComment
            commentDate={value.commentDate}
            commentId={value.commentID}
            commentText={value.commentText}
            userImageURL={value.userImageUrl}
            userCountry={value.userCountry}
            key={value.commentID}
            userName={value.userName}
          />
        ))}
      <form
        className="d-grid p-3"
        onSubmit={handleSubmit}
        style={{ gridTemplateColumns: "1fr 150px", gap: "15px" }}
      >
        <input
          type="text"
          name="comment"
          className="border-0 p-3"
          style={{ outline: "none", borderRadius: "8px" }}
          autoComplete="off"
          required
          value={addPost.comment}
          onChange={handleCommentChange}
        />
        <Button variant="success" type="submit" disabled={loading}>
          {loading ? "جاري الارسال..." : "ارسال"}
        </Button>
      </form>
    </article>
  );
}
