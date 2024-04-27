import { ILoginResponse, IRegisterResponse } from "./../types/types";
import { $api, } from "../common/api";
import { IAuthFields } from "../types/types";

class AuthService {
  async register(data: IAuthFields) {
    return $api.post<IRegisterResponse>("users/register/", {
      email: data.email,
      password: data.password,
      // client_id: CLIENT_ID,
      // client_secret: CLIENT_SECRET,
      // grant_type: "password",
    });
  }
  async login(data: IAuthFields) {
    return $api.post<ILoginResponse>("users/login/", {
      // client_id: 'clientId',
      // client_secret: 'CLIENT_SECRET',
      // grant_type: "password",
      email: data.email,
      password: data.password,
    });
  }
}


export default new AuthService();
