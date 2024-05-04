import { $api, $apiPrivate } from "../common/api";
import { IPromotion, IResults } from "../types/types";

interface GetAllParams {
  page?: number;
  page_size?: number;
  company__name?: string;
  category__title?: string;
  type?: string;
  discount?: string;
}

interface CreateBody {
  title: string;
  description: string;
  company: number;
  category?: number;
  type?: number;
  new_price: number;
  old_price?: number;
  discount?: number;
  address?: string;
  end_date: string;
  instagram?: string;
  facebook?: string;
  whatsapp?: string;
  website?: string;
  is_daily?: boolean;
}

class PromotionsService {
  getAll(params?: GetAllParams) {
    return $api<IResults<IPromotion>>("promotions/all/", {
      params,
    });
  }
  getById(id: number) {
    return $api<IPromotion>(`promotions/${id}/`);
  }
  like(id: number) {
    return $apiPrivate.post(`promotions/like/${id}/`);
  }
  create(body: CreateBody) {
    return $apiPrivate.post("promotions/create/", body);
  }
}

export default new PromotionsService();
