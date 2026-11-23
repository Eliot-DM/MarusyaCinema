import { createSlice } from "@reduxjs/toolkit";

export type AuthFormType = "login" | "register" | "registerEnd" | null;

export interface AuthFormState {
  value: AuthFormType;
}
const initialState: AuthFormState = {
  value: "login",
};

export const AuthModalFormSlice = createSlice({
  name: "authForm",
  initialState,
  reducers: {
    formLogin: (state) => {
      state.value = "login";
    },
    formRegister: (state) => {
      state.value = "register";
    },
    formRegisterEnd: (state) => {
      state.value = "registerEnd";
    },
    formNull: (state) => {
      state.value = null;
    },
  },
});

export const { formLogin, formRegister, formRegisterEnd, formNull } =
  AuthModalFormSlice.actions;

export default AuthModalFormSlice.reducer;
