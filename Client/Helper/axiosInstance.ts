import axios, { AxiosInstance } from "axios";

const BASIC_URL: string = "http://localhost:5001";
// "https://collage-web-4vba.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASIC_URL,
  withCredentials: true,
});

export default axiosInstance;
