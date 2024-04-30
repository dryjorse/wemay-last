import { $api, $apiPrivate } from "../common/api";
import { IPromotion, IResults } from "../types/types";

interface getAllParams {
  page?: number;
  page_size?: number;
  company__name?: string;
  category__title?: string;
  type?: string;
  discount?: string;
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
  like(id: number) {
    return $apiPrivate.post("promotions/like/", { id });
  }
}

export default new PromotionsService();
