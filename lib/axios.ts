import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      // Instead of using window.location, we'll let the useAuth hook handle the redirect
      // This prevents the page refresh and allows error messages to be shown
    }
    return Promise.reject(error);
  }
);
