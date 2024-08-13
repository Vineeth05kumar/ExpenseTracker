
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    token: null,
    userId: null,
  },
  reducers: {
    login(state, action) {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.userId = action.payload.userId;

      // Save to localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("userId", action.payload.userId);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.token = null;
      state.userId = null;

      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
    },
    setLoginFromLocalStorage(state) {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");

      if (token && userId) {
        state.isLoggedIn = true;
        state.token = token;
        state.userId = userId;
      }
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;