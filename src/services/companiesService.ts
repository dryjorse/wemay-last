import { $api } from "../common/api";
import { ICompany, IResults } from "../types/types";

class CompaniesService {
  getAll() {
    return $api<IResults<ICompany>>("companies/all/");
  }
  getById(id: number) {
    return $api<ICompany>(`companies/${id}/`);
  }
}

export default new CompaniesService();
