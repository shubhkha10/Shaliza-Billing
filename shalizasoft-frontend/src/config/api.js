import axios from "axios";

const API = axios.create({
  baseURL: "https://shaliza-billing-production.up.railway.app/api",
});

export default API;