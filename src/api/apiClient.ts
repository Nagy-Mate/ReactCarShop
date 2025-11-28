import axios from "axios";

export const BASEURL = "http://localhost:8002/api";

const apiClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
