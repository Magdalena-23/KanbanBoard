import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", error.response.status, error.response.data);
      toast.error(
        `Error ${error.response.status}: ${
          error.response.data.message || "Something went wrong"
        }`
      );
    } else if (error.request) {
      toast.error("Network error: No response from server");
    } else {
      toast.error("Unexpected error occurred");
    }
    return Promise.reject(error);
  }
);

export default api;
