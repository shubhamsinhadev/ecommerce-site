import axios from "axios";

const axiosAPI = axios.create({
  baseURL: "/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axiosAPI;
