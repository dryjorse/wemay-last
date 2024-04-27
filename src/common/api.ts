import axios from "axios";

export const API_URL = 'http://127.0.0.1:8000/api/v1/';

export const $api = axios.create({ baseURL: API_URL });
export const $apiPrivate = axios.create({ baseURL: API_URL}); 

// $apiPrivate.interceptors.request.use((config) => {
//   config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
//   return config;
// });

$apiPrivate.interceptors.response.use(
  (response) => response,
);
