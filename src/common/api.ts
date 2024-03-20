import axios from "axios";

export const API_URL = import.meta.env.VITE_API_URL;
export const CLIENT_ID = "kVbGqdq5iUoxSGHcVMBypG0DE5VZrpIKuZSrc3vf";
export const CLIENT_SECRET =
  "Jo51o9s0x9K54b35gtizvOx37UbiQsOWucLvwByBTrCTK66T2DjM1hrDzYHO6KnGTvVMqB9S86CDqwcnJYxYJSHdPIEjsWP1gRWSpqkwfk9S6xUEehmkizAVKGtqWE7Y";

export const $api = axios.create({ baseURL: API_URL + "/" });
export const $apiPrivate = axios.create({ baseURL: API_URL + "/" });

$apiPrivate.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$apiPrivate.interceptors.response.use(
  (response) => response,
  (error) => {}
);
