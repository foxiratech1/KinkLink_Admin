// dashboard.api.ts ya jahan bhi aapki api files hain
import { API_ROUTES } from "../config/api";
import axiosInstance from "../utils/axios";
export const getDashboardVerificationStats = async (range: "1D" | "7D" = "7D") => {
  const res = await axiosInstance.get(
    `${API_ROUTES.DASHBOARD.GET_USER_VERIFICATION_STATISTICS}?range=${range}`
  );
  return res.data;
};
export const getDashboardCounts = async () => {
  const res = await axiosInstance.get(API_ROUTES.DASHBOARD.GET_DASHBOARD_COUNT);
  return res.data;
};
