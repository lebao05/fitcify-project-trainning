import axios from "axios";
const instance = axios.create({
    baseURL: "http://localhost:8081/",
    timeout: 1000,
});
instance.interceptors.request.use(
    function (config) {
        const persistRoot = JSON.parse(localStorage.getItem("persist:root"));
        const loginData = persistRoot?.login ? JSON.parse(persistRoot.login) : null;
        const accessToken = loginData?.account?.accessToken;
        if (access_token) {
            config.headers["Authorization"] = `Bearer ${accessToken}`;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
export default instance;