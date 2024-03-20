import { ILoginResponse, IRegisterResponse } from "./../types/types";
import { $api, CLIENT_ID, CLIENT_SECRET } from "../common/api";
import { IAuthFields } from "../types/types";

class AuthService {
  async register(data: IAuthFields) {
    return $api.post<IRegisterResponse>("users/register/", {
      email: data.email,
      password: data.password,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "password",
    });
  }
  async login(data: IAuthFields) {
    return $api.post<ILoginResponse>("oauth/token/", {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: "password",
      username: data.email,
      password: data.password,
    });
  }
}

export default new AuthService();
