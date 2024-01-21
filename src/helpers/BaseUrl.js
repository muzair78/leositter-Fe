import axios from "axios";
import { toast } from "react-toastify";
const token = JSON.parse(localStorage.getItem("token"));
const instance = axios.create({
  baseURL: `http://52.90.240.61:4000`,
  // baseURL: `http://localhost:4000`,

  headers: {
    Authorization: `${token}`,

    "cache-control": "no-cache",
  },
});

instance.interceptors.request.use(
  async (config) => {
    // config.headers.Authorization = `Bearer ${getToken()}`;

    return config;
  },
  (error) => {
    return error;
  }
);

// instance.interceptors.response.use(
//   (response) => {
//     if (response.data.message) {
//       toast.success(response.data.message);
//     }
//     return response;
//   },
//   (error) => {
//     if (error.response?.status === 401) {
//       localStorage.removeItem("user");
//     }

//     if (error.response?.data?.message) {
//       toast.error(error.response.data.message);
//     } else if (error.message) {
//       toast.error(error.message);
//     } else if (error.response?.data?.error) {
//       toast.error(error.response.data.error);
//     }
//     return error;
//   }
// );

export default instance;
