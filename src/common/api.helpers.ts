import Cookies from "js-cookie";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("token", accessToken);
  Cookies.set("refresh", refreshToken);
};
