import axios from "axios";
import { useUserStore } from "../../../state/userStore";

const API_BASE_URL = "https://api-admin.bondyt.com/"; 

const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor to attach token before every request
apiClient.interceptors.request.use(
    (config) => {
        const { accessToken } = useUserStore.getState();
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { refreshToken, _handleRefreshToken, _logOutUser } = useUserStore.getState();
        const originalRequest = error.config;

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true; // Prevent multiple retries

            try {
                console.log("Access token expired. Refreshing...");
                const refreshResponse = await axios.post(`${API_BASE_URL}/auth/refresh`, {
                    refreshToken,
                });

                if (refreshResponse.status === 200) {
                    const { accessToken, refreshToken: newRefreshToken } = refreshResponse.data;
                    _handleRefreshToken(accessToken, newRefreshToken);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed, logging out...");
                _logOutUser();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;