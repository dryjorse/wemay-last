import { $apiPrivate } from "../common/api";
import { IProfileFields, IUser } from "../types/types";

interface IChangeProfileBody extends Partial<Omit<IProfileFields, "image">> {
  image?: string;
}

interface IChangePasswordBody {
  new_password: string;
  re_new_password: string;
  current_password: string;
}

class ProfileService {
  async getProfile() {
    return $apiPrivate<IUser>("auth/users/me/");
  }
  async changeProfile(body: IChangeProfileBody) {
    return $apiPrivate.patch("users/profile/", body);
  }
  async changePassword(body: IChangePasswordBody) {
    return $apiPrivate.post("auth/users/set_password/", body);
  }
}

export default new ProfileService();
