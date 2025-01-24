import axios from "axios";

const axiosAPI = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 5000,
});

export default axiosAPI;
