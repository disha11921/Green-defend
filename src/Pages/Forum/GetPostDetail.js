import { token } from "../../constants";

export const GetPostDetail = async (PostId) => {
  const url = `https://greendefined.runasp.net/api/forum/GetPostDetail?PostId=${PostId}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: PostId,
  });
  return response;
};
