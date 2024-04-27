import { $api } from "../common/api";
import { ICategory } from "../types/types";

class Category {
    getAll(){
        return $api<ICategory[]>('promotions/category/all/')
    }
}

export default new Category();