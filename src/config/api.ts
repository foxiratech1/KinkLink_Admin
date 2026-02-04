export const API_ROUTES = {
  AUTH: {
    LOGIN: "api/admin/login",
    LOGOUT: "api/admin/logout",
    FORGOT_PASSWORD: "api/admin/forget-password",
    LOGIN_VERIFY_OTP: (id: string) => `api/admin/login-verify-otp/${id}`,
    VERIFY_OTP: (id: string) => `api/admin/verify-otp/${id}`,
    RESET_PASSWORD: (token: string) => `api/admin/reset-password/${token}`,
    RESEND_OTP: (id: string) => `api/admin/resend-otp/${id}`
  },
  USERS: {
    GET_ALL: "api/admin/users",
    GET_PENDING: "api/admin/users-pending",
    GET_USER_DETAILS: (id: string) => `api/admin/get-user-details/${id}`,
    APPROVEREJECT: (id: string) => `api/admin/regiStatus-Update/${id}`,
    BLOCK_UNBLOCK: (id: string) => `api/admin/block-unblock-user/${id}`,
    GET_REJECT: "api/admin/users-reject",
    BLOCKED_USERS: "api/admin/users-blocked",

  },
  INTERESTS: {
    ADD: "api/admin/interest",
    GET_LIST: "api/admin/interest-list",
    DELETE: (id: string) => `api/admin/delete-interest/${id}`,
    UPDATE: (id: string) => `api/admin/update-interest/${id}`,
  },
};
