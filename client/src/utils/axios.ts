import axios, { AxiosError } from "axios";

const axiosAPI = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
  timeout: 5000,
});

axiosAPI.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error: AxiosError<{ message: string }>) {
    throw new Error(error.response?.data.message || "Something went wrong");
  }
);

export default axiosAPI;
