export const API_ROUTES = {
  AUTH: {
    LOGIN: "api/admin/login",
    LOGOUT: "api/admin/logout",
    FORGOT_PASSWORD: "api/admin/forget-password",
    LOGIN_VERIFY_OTP: (id: string) => `api/admin/login-verify-otp/${id}`,
    VERIFY_OTP: (id: string) => `api/admin/verify-otp/${id}`,
    RESET_PASSWORD: (token: string) => `api/admin/reset-password/${token}`,
    RESEND_OTP: (id: string) => `api/admin/resend-otp/${id}`,
    GET_PROFILE: "/api/admin/profile-details",
    UPDATE_PROFILE: "/api/admin/update-profile",
  },
  DASHBOARD: {
    GET_USER_VERIFICATION_STATISTICS:
      "api/admin/get-dashboard-verification-stats",
    GET_DASHBOARD_COUNT: "api/admin/get-dashboard-count",
    GET_DASHBOARD_ANALYTICS: "api/admin/get-dashboard-analytics",
    GET_FUNNEL_CITY_ANALYTICS: "api/admin/get-funnel-city-analytics",
  },
  USERS: {
    GET_ALL: "api/admin/users",
    GET_PENDING: "api/admin/users-pending",
    GET_USER_DETAILS: (id: string) => `api/admin/get-user-details/${id}`,
    APPROVEREJECT: (id: string) =>
      `api/admin/update-user-verification-status/${id}`,
    SUSPENDED: (id: string) => `api/admin/user-verification-suspend/${id}`,
    BLOCK_UNBLOCK: (id: string) => `api/admin/block-unblock-user/${id}`,
    GET_REJECT: "api/admin/users-reject",
    BLOCKED_USERS: "api/admin/users-blocked",
    GET_ALL_REPORTS: "api/admin/all-reports",
    TAKE_REPORT_ACTION: "/api/report/report/take-action",
    GET_REPORT_USER_DETAIL: (id: string) => `api/report/report-user-detail/${id}`,
    GET_TARGET_USER_REPORT: (id: string) => `api/report/target-user-report/${id}`,
  },
  INTERESTS: {
    ADD: "api/admin/interest",
    GET_LIST: "api/admin/interest-list",
    DELETE: (id: string) => `api/admin/delete-interest/${id}`,
    UPDATE: (id: string) => `api/admin/update-interest/${id}`,
  },
  FORUMS: {
    GET_LIST: "api/admin/get-forums-category",
    ADD: "api/admin/create-forums-category",
    UPDATE: (id: string) => `api/admin/update-forums-category/${id}`,
    DELETE: (id: string) => `api/admin/delete-forums-category/${id}`,
  },
  EVENT: {
    GET_EVENT_TYPE_LIST: "api/admin/event-type-list",
    ADD_EVENT_TYPE: "api/admin/event-type",
    UPDATE_EVENT_TYPE: (id: string) => `api/admin/update-event-type/${id}`,
    DELETE_EVENT_TYPE: (id: string) => `api/admin/delete-event-type/${id}`,
  },
  ADMIN: {
    CREATE_SUBADMIN: "api/admin/create-subadmin",
    GET_SUBADMINS: "api/admin/subadmins",
    DELETE_SUBADMIN: (id: string) => `api/admin/delete-subadmin/${id}`,
    UPDATE_SUBADMIN: (id: string) => `api/admin/update-subadmin/${id}`,
  },
};
