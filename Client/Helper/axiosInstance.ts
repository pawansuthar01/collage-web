import axios, { AxiosInstance } from "axios";

const BASIC_URL: string = "https://collage-web-1.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASIC_URL,
  withCredentials: true,
});

export default axiosInstance;
