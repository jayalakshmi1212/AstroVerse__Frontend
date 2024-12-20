import axios from "axios";
import store from '../Redux/Store'
import { setUser, clearUser } from '../Features/Authentication/Authslice'

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/", // Update base URL if needed
  timeout: 1000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post("http://localhost:8000/api/token/refresh/", {
            refresh: refreshToken,
          });

          // Update tokens in Redux and sessionStorage
          store.dispatch(
            setUser({
              user: store.getState().auth.user,
              accessToken: response.data.access,
              refreshToken, // No need to refresh the refresh token unless the backend does so
              role: store.getState().auth.role,
            })
          );

          // Retry the original request
          originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        store.dispatch(clearUser());
        window.location.href = '/login'; // Redirect to login
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;


