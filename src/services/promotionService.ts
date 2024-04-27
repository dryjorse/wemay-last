import { $api } from "../common/api";
import { IPromotion, IResults } from "../types/types";

class promotionsService {
    getAll(){
        return $api<IResults<IPromotion>>('promotions/all/')
    }
    getById(id: number){
        return $api<IPromotion>(`promotions/${id}/`)
    }

}

export default new promotionsService();