import { $api } from "../common/api";
import { ICompany, IResults } from "../types/types";

class CompaniesService {
    getAll(){
        return $api<IResults<ICompany>>('companies/all/');
    }
}


export default new CompaniesService();