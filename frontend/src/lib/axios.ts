import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://api.twitterr.my.id",
  withCredentials: true,
});

export default axiosInstance;
