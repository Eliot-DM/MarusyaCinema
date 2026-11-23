import axios from "axios";
import { URL_CINEMAGUIDE } from "./URL";
import type { Movie, User } from "./schemas";

export const getFavoritesReceiving = async (): Promise<Movie[]> => {
  const res = await axios.get<Movie[]>(`${URL_CINEMAGUIDE}favorites`, {
    withCredentials: true,
  });
  return res.data;
};

export const favoritesAddendum = async (movieId: string): Promise<User> => {
  const res = await axios.post<User>(
    `${URL_CINEMAGUIDE}favorites`,
    { id: movieId },
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  return res.data;
};

export const deleteFavorites = async (movieId: string): Promise<User> => {
  const res = await axios.delete<User>(
    `${URL_CINEMAGUIDE}favorites/${movieId}`,
    {
      withCredentials: true,
    },
  );
  return res.data;
};
