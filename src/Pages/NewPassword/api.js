export const SendForgetPasswordOTP = async (userData, email) => {
  const url = `https://greendefined.runasp.net/api/Account/SendForgetPasswordOTP?Email=${email}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response;
};

export const CheckForgetPasswordOTP = async (userData, email, code) => {
  const url = `https://greendefined.runasp.net/api/Account/CheckForgetPasswordOTP?Email=${email}&Code=${code}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response;
};

export const AddingNewPassword = async (userData) => {
  const url = "https://greendefined.runasp.net/api/Account/AddingNewPassword";
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  return response;
};
