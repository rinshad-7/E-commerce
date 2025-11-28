import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "http://16.170.231.213/", 
  withCredentials:true,
});

export default api;
