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
        return Promise.reject(new Error("Oops! something is wrong try reloading this tab"));
    }
);

// Response interceptor to handle token refresh
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { refreshToken, _handleRefreshToken, _logOutUser } = useUserStore.getState();
        const originalRequest = error.config;

        if (error.response?.status === 401 && refreshToken && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                console.log("Access token expired. Refreshing...");
                const refreshResponse = await axios.get(
                    `${API_BASE_URL}admin/auth/refresh`,
                    {
                        headers: {
                            Authorization: `Bearer ${refreshToken}`
                        }
                    }
                );

                if (refreshResponse.status === 200) {
                    const { token } = refreshResponse.data;
                    _handleRefreshToken(token.access_token, token.refresh_token);

                    // Retry original request with new token
                    originalRequest.headers.Authorization = `Bearer ${token.access_token}`;
                    return apiClient(originalRequest);
                }
            } catch (refreshError) {
                console.error("Token refresh failed, logging out...");
                _logOutUser();
                return Promise.reject(new Error("Oops! something is wrong try reloading this tab"));
            }
        }

        return Promise.reject(new Error("Oops! something is wrong try reloading this tab"));
    }
);

export default apiClient;