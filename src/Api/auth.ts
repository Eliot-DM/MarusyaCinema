import axios from "axios";
import { URL_CINEMAGUIDE } from "./URL";
import type { AuthInfo, RegisterData, SuccessfulResult, User } from "./schemas";

export const registerUser = async (
  userData: RegisterData,
): Promise<SuccessfulResult> => {
  try {
    const res = await axios.post<SuccessfulResult>(
      `${URL_CINEMAGUIDE}user`,
      userData,
      { headers: { "Content-Type": "application/json" } },
    );
    return res.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const loginUser = async (
  loginData: AuthInfo,
): Promise<SuccessfulResult> => {
  try {
    const res = await axios.post<SuccessfulResult>(
      `${URL_CINEMAGUIDE}auth/login`,
      loginData,
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      },
    );
    return res.data;
  } catch (error) {
    console.error("error:", error);
    throw error;
  }
};

export const getUserLogout = async (): Promise<boolean> => {
  try {
    const res = await axios.get<boolean>(`${URL_CINEMAGUIDE}auth/logout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("Logout error:", error);
    throw new Error("Logout failed");
  }
};

export const getUserProfile = async (): Promise<User> => {
  try {
    const res = await axios.get<User>(`${URL_CINEMAGUIDE}profile`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.error("profile error:", error);
    throw new Error("profile failed");
  }
};
