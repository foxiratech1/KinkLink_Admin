import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

/**
 * =========================
 * REQUEST INTERCEPTOR
 * =========================
 */
axiosInstance.interceptors.request.use(
  (config) => {
    // ngrok browser warning fix
    config.headers["ngrok-skip-browser-warning"] = "true";

    //  Attach token ONLY if exists
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * =========================
 * RESPONSE INTERCEPTOR
 * =========================
 */
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;
    const requestUrl = error?.config?.url || "";

    // Public routes (NO auto logout here)
    const publicRoutes = ["/signin", "/verify-otp", "/reset-password"];

    const isPublicRoute = publicRoutes.some((route) =>
      window.location.pathname.includes(route)
    );

    const isStickerRoute = requestUrl.includes("sticker") || window.location.pathname.includes("sticker");

    /**
     * Token expired / invalid
     * - Only logout if:
     *   1. Status is 401
     *   2. User is NOT on public route
     *   3. Request is NOT a sticker endpoint or page
     *   4. Token actually exists
     */
    if (status === 401 && !isPublicRoute && !isStickerRoute) {
      const token = localStorage.getItem("token");

      if (token) {
        console.warn("401 detected — logging out");

        localStorage.removeItem("token");
        sessionStorage.removeItem("temp_remember_me");

        window.location.href = "/signin";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
