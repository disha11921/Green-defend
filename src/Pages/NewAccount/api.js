export const createUser = async (userData) => {
  const url = "https://greendefined.runasp.net/api/Account/Register";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      //   Authorization: `Bearer ${yourTokenHere}`, // Replace with your actual Bearer token
    },

    body: JSON.stringify(userData),
  });

  return response;
};
