import axios, { AxiosInstance } from "axios";

const BASIC_URL: string = "https://full-stack-portolio-1-0evy.onrender.com";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASIC_URL,
  withCredentials: true,
});

export default axiosInstance;
