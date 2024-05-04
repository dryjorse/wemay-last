import { ILoginResponse, IRegisterResponse } from "./../types/types";
import { $api } from "../common/api";
import { IAuthFields } from "../types/types";

class AuthService {
  async register(data: IAuthFields) {
    return $api.post<IRegisterResponse>("users/register/", {
      email: data.email,
      password: data.password,
    });
  }
  async login(data: IAuthFields) {
    return $api.post<ILoginResponse>("users/login/", {
      email: data.email,
      password: data.password,
    });
  }
  async forgotPassword(email: string) {
    return $api.post("auth/users/reset_password/", { email });
  }
}

export default new AuthService();
