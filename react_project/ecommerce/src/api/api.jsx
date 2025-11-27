import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:3000/", 
  withCredentials:true,
});

export default api;
