import { token } from "../../constants";

export const GetPosts = async () => {
  const url = "https://greendefined.runasp.net/api/forum/GetPosts";

  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`, // Replace with your actual Bearer token
    },
  });

  return response;
};
