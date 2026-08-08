import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
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
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response?.status;
    if (status == 400) {
      console.error("Bad Request invalid data");
    }
    if (status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
    }
    if (status === 403) {
      console.error("forbidden");
    }
    if (status === 404) {
      console.error("Not Found");
    }
    if (status === 500) {
      console.error("Internal Server Error");
    }
    return Promise.reject(error);
  },
);
export default api;
