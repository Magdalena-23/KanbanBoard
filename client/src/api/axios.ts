import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// console.log(process.env.BASE_API_URL, "BASE_API_URL");

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default api;
