import { $apiPrivate } from "../common/api";
import { IUser } from "../types/types";

class ProfileService {
  async getProfile() {
    return $apiPrivate<IUser>("auth/users/me/");
  }
}

export default new ProfileService();
