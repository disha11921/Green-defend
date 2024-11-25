export const EditProfileAPI = async (userData) => {
  const url = "https://greendefined.runasp.net/api/Account/EditProfile";
  const formData = new FormData();
  formData.append("id", userData.id);
  formData.append("FullName", userData.FullName);
  formData.append("Bio", userData.Bio);
  formData.append("Country", userData.Country);
  if (userData.DiagnosticTipsImage) {
    formData.append("DiagnosticTipsImage", userData.DiagnosticTipsImage);
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: formData,
  });

  return response;
};
