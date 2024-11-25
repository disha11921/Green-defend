import { token } from "../../constants";

export const AddReactAPI = async (formData) => {
  const url = "https://greendefined.runasp.net/api/forum/AddReact";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  console.log(data);
  return response;
};
