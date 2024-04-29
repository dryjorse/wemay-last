import axios from "axios";
import { IAddress } from "../types/types";

class MapService {
  getByName(name: string) {
    return axios.get<IAddress[]>(
      `https://nominatim.openstreetmap.org/search?format=json&q=${name}`
    );
  }
}

export default new MapService();
