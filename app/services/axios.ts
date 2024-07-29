import axios from "axios";
import { getCookie } from "cookies-next";

export const serviceAxios = axios.create({
  baseURL: "https://service.rmosweb.com",
  headers: {
    "Content-type": "application/json",
    "cache-control": "no-cache",
  },
});

export const frontServiceAxios = axios.create({
  baseURL: "https://frontapi.rmosweb.com/api",
  headers: {
    "Content-type": "application/json",
    "cache-control": "no-cache",
    Authorization: `Bearer ${getCookie("token")}`,
  },
});
