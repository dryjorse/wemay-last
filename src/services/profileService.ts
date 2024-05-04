import { $apiPrivate } from "../common/api";
import { IUser } from "../types/types";

class ProfileService {
  async getProfile() {
    return $apiPrivate<IUser>("auth/users/me/");
  }
  async logout() {
    return $apiPrivate.post("users/logout/");
  }
}

export default new ProfileService();
