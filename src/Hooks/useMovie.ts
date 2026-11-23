import { useQuery } from "@tanstack/react-query";
import { getMovieId } from "../Api/movies";
import { queryClient } from "../Api/QueryClient";

export const useMovie = (id?: string) => {
  return useQuery(
    {
      queryKey: ["movie", id],
      queryFn: () => getMovieId(Number(id)),
      enabled: !!id,
    },
    queryClient,
  );
};
