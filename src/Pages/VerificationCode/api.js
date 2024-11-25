export const confirmAccount = async (formData) => {
  const url = "https://greendefined.runasp.net/api/Account/ConfirmAccount";

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  return response;
};
