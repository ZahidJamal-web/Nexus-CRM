
import axios from "axios";

export const TOKEN_KEY = "nexus_crm_token";

const baseURL =
  import.meta.env.VITE_API_URL ||
  "https://nexuscrm-backend.vercel.app/api";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach the JWT to every request if we have one.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Normalize responses and errors.
api.interceptors.response.use(
  (res) => res.data,
  (error) => {
    const status = error.response?.status;
    const message =
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";

    // Auto-logout on an expired/invalid token.
    if (
      status === 401 &&
      !window.location.pathname.startsWith("/login")
    ) {
      localStorage.removeItem(TOKEN_KEY);
    }

    return Promise.reject({ status, message });
  }
);

export default api;
