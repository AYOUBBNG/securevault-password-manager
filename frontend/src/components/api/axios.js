import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    const email = localStorage.getItem("email");
    if (email) {
      config.headers["X-User-Email"] = email;
    }
    const twoFaOk = localStorage.getItem("twoFaOk");
    if (twoFaOk === "true") {
      config.headers["X-User-2FA"] = "true";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
