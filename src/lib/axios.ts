import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://twitterr.my.id",
  withCredentials: true,
});

export default axiosInstance;
