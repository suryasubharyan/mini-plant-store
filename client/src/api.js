import axios from "axios";

const API = axios.create({
  baseURL: "https://mini-plant-store-1-38n4.onrender.com/", // ✅ backend URL
});

// Attach token automatically for protected routes
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
