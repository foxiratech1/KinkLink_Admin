import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi, logoutApi } from "../api/authapi";
import { getErrorMessage } from "../types/error";

/* ================= TYPES ================= */

export interface AuthState {
  token: string | null;
  adminId: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

/* ================= HELPERS ================= */
const getToken = () => localStorage.getItem("token");

/* ================= STATE ================= */

const initialState: AuthState = {
  token: getToken(),
  adminId: null,
  isAuthenticated: !!getToken(), // Set to true if token exists
  loading: false,
  error: null,
};

/* ================= ASYNC THUNK ================= */

export const login = createAsyncThunk<
  { adminId: string; rememberMe: boolean },
  { email: string; password: string; rememberMe: boolean }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const { rememberMe, ...credentials } = payload;

    const data = await loginApi(credentials);

    // OTP required
    if (data.adminId) {
      return { adminId: data.adminId, rememberMe };
    }

    return rejectWithValue("OTP required");
  } catch (error) {
    const errorMessage = getErrorMessage(error);
    console.error("[Login Error]", errorMessage, error);
    return rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk<void, void>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      // Note: localStorage cleanup happens in component/middleware
    } catch (error) {
      const errorMessage = getErrorMessage(error);
      console.error("[Logout Error]", errorMessage, error);
      // Force logout even if API fails - cleanup happens elsewhere
      return rejectWithValue(errorMessage);
    }
  },
);

/* ================= SLICE ================= */

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthSuccess(state, action: { payload: { token: string } }) {
      const { token } = action.payload;

      //  Pure reducer - NO side effects
      // localStorage is handled in component
      state.token = token;
      state.isAuthenticated = true;
      state.adminId = null;
    },

    logout(state) {
      //  Pure reducer - NO side effects
      // localStorage cleanup happens in component
      state.token = null;
      state.adminId = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;

        if (action.payload.adminId) {
          state.adminId = action.payload.adminId;
        }
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

/* ================= EXPORTS ================= */

export const { logout, setAuthSuccess } = authSlice.actions;
export default authSlice.reducer;
