import axios from "axios";
import { getCookie } from "cookies-next";

export const serviceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
    "cache-control": "no-cache",
  },
});

export const frontServiceAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_FRONT_SERVICE_URL,
  headers: {
    "Content-type": "application/json",
    "cache-control": "no-cache",
    Authorization: `Bearer ${getCookie("token")}`,
  },
});
