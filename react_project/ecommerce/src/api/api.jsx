import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://localhost:300/", 
  withCredentials:true,
});

export default api;
