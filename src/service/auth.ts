export const addUser = async (data: {
  username: string;
  account: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await fetch("/api/Auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw new Error(resData.message);
  }
  return resData.data;
};

export const Login = async (data: { account: string; password: string }) => {
  const response = await fetch("/api/Auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
  const resData = await response.json();
  if (!response.ok) {
    throw Error(resData.message);
  }
  return resData.data;
};

export const getME = async () => {
  const response = await fetch("/api/Auth/me");
  const resData = await response.json();
  if (!response.ok) {
    throw Error(resData.message);
  }
  return resData.data;
};

export const userLogout = async () => {
  const response = await fetch("/api/Auth/logout", { method: "POST" });
  const resData = await response.json();
  return resData.data;
};
