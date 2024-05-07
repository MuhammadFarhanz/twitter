import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://twitterr.my.id",
  withCredentials: true,
});

export default axiosInstance;
