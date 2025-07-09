import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  withCredentials: true, // 🔑 Important to send cookies
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
