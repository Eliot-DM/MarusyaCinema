import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  value: boolean;
}

const initialState: AuthState = {
  value: false,
};

export const AuthModalSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authOpen: (state) => {
      state.value = true;
    },
    authExit: (state) => {
      state.value = false;
    },
  },
});

export const { authOpen, authExit } = AuthModalSlice.actions;

export default AuthModalSlice.reducer;
