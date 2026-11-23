import { configureStore } from "@reduxjs/toolkit";
import authModalReducer from "./AuthModalSlice";
import authModalFormReducer from "./AuthModalFormSlice";
export const store = configureStore({
  reducer: { authModal: authModalReducer, authModalForm: authModalFormReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
