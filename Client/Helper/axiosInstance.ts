import axios, { AxiosInstance } from "axios";

const BASIC_URL: string = "http://localhost:5000";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASIC_URL,
  withCredentials: true,
});

export default axiosInstance;
