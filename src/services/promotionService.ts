import { $api } from "../common/api";
import { IPromotion, IResults } from "../types/types";

interface getAllParams {
  page?: number;
  page_size?: number;
}

class PromotionsService {
  getAll(params?: getAllParams) {
    return $api<IResults<IPromotion>>("promotions/all/", {
      params,
    });
  }
  getById(id: number) {
    return $api<IPromotion>(`promotions/${id}/`);
  }
}

export default new PromotionsService();
