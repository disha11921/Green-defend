export default function UserComment({
  commentDate,
  commentId,
  commentText,
  userImageURL,
  userCountry,
  userName,
}) {
  return (
    <>
      <div className="comments bg-white p-3">
        <div className="comment">
          <div className="head d-flex align-items-center justify-content-end">
            <div
              className="text d-grid"
              style={{ gridTemplateColumns: "1fr 70px" }}
            >
              <span
                className="name fw-bold text-success"
                style={{ gridColumn: "1 / -1" }}
              >
                {userName}
              </span>
              <span className="country">{userCountry}</span>
              <span className="duration text-secondary">
                {commentDate.substr(0, 10)}
              </span>
            </div>
            <div className="image">
              <img
                src={userImageURL}
                width={75}
                height={75}
                className="rounded-circle"
                alt="content"
              />
            </div>
          </div>
          <div className="body">
            <p className="content text-secondary text-start w-100 m-0">
              {commentText}
            </p>
            <hr style={{ width: "calc(100% + 4rem)", marginLeft: "-2rem" }} />
          </div>
        </div>
      </div>
    </>
  );
}
