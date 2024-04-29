import Cookies from "js-cookie";

export const saveTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem("wemay-access-token", accessToken);
  Cookies.set("wemay-refresh-token", refreshToken, { expires: 30 });
};
