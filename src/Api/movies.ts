import axios from "axios";
import { URL_CINEMAGUIDE } from "./URL";
import type { Movie, MovieFilters } from "./schemas";

export const getMovies = async (
  filters: MovieFilters = {},
): Promise<Movie[]> => {
  try {
    const params = new URLSearchParams();

    if (filters.count !== undefined) {
      params.append("count", filters.count.toString());
    }
    if (filters.page !== undefined) {
      params.append("page", filters.page.toString());
    }
    if (filters.title) {
      params.append("title", filters.title);
    }
    if (filters.genre) {
      params.append("genre", filters.genre);
    }

    const res = await axios.get<Movie[]>(
      `${URL_CINEMAGUIDE}movie?${params.toString()}`,
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};

export const getMovieTop = async (): Promise<Movie[]> => {
  try {
    const res = await axios.get<Movie[]>(`${URL_CINEMAGUIDE}movie/top10`);
    return res.data;
  } catch (error) {
    console.error("movie/top10:", error);
    throw new Error("movie/top10");
  }
};

export const getMovieGenres = async (): Promise<string[]> => {
  try {
    const res = await axios.get<string[]>(`${URL_CINEMAGUIDE}movie/genres`);
    return res.data;
  } catch (error) {
    console.error("movie/genres:", error);
    throw new Error("movie/genres");
  }
};

export const getMovieId = async (movieId: number): Promise<Movie> => {
  try {
    const res = await axios.get<Movie>(`${URL_CINEMAGUIDE}movie/${movieId}`);
    return res.data;
  } catch (error) {
    console.error("movie:", error);
    throw new Error("movie");
  }
};

export const getMovieRandom = async (): Promise<Movie> => {
  try {
    const res = await axios.get<Movie>(`${URL_CINEMAGUIDE}movie/random`);
    return res.data;
  } catch (error) {
    console.error("movie/top10:", error);
    throw new Error("movie/top10");
  }
};
