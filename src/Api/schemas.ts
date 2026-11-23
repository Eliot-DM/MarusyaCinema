import { z } from "zod";

export const UserSchema = z.object({
  email: z.string(),
  name: z.string(),
  surname: z.string(),
  favorites: z.array(z.string()),
});

export type User = z.infer<typeof UserSchema>;

export const AuthInfoSchema = z.object({
  email: z.string(),
  password: z.string(),
});

export type AuthInfo = z.infer<typeof AuthInfoSchema>;

export const SuccessfulResultSchema = z.object({
  result: z.boolean(),
});

export type SuccessfulResult = z.infer<typeof SuccessfulResultSchema>;

export const ErrorSchema = z.object({
  result: z.string(),
});

export type Error = z.infer<typeof ErrorSchema>;

export const RegisterDataSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
  surname: z.string(),
});

export type RegisterData = z.infer<typeof RegisterDataSchema>;

export const MovieSchema = z.object({
  id: z.number().int(),
  title: z.string(),
  originalTitle: z.string(),
  language: z.string(),
  relaseYear: z.int(),
  genres: z.array(z.string()),
  plot: z.string(),
  runtime: z.int(),
  budget: z.string(),
  revenue: z.string(),
  homepage: z.string(),
  status: z.string(),
  posterUrl: z.string(),
  backdropUrl: z.string(),
  trailerUrl: z.string(),
  trailerYouTubeId: z.string(),
  tmdbRating: z.int(),
  searchL: z.string(),
  keywords: z.array(z.string()),
  countriesOfOrigin: z.array(z.string()),
  languages: z.array(z.string()),
  cast: z.array(z.string()),
  director: z.string(),
  production: z.string(),
  awardsSummary: z.string(),
});

export type Movie = z.infer<typeof MovieSchema>;

export const ApiResponseSchema = z.object({
  code: z.int32(),
  type: z.string(),
  message: z.string(),
});

export type ApiResponse = z.infer<typeof ApiResponseSchema>;

export const favorites_bodySchema = z.object({
  id: z.string(),
});

export type favorites_body = z.infer<typeof favorites_bodySchema>;

export const MovieFiltersSchema = z.object({
  count: z.number().optional(),
  page: z.number().optional(),
  title: z.string().optional(),
  genre: z.string().optional(),
});

export type MovieFilters = z.infer<typeof MovieFiltersSchema>;
