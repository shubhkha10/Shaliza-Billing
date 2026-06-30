import axios from "axios";

export const BASE_URL =
  "https://shaliza-billing-production.up.railway.app/api";

const API = axios.create({
  baseURL: BASE_URL,
});

export default API;