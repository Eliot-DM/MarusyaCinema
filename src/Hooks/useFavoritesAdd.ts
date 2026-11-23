import { useMutation } from "@tanstack/react-query";
import { favoritesAddendum } from "../Api/favorites";
import { queryClient } from "../Api/QueryClient";

export const useFavoritesAdd = () => {
  return useMutation({
    mutationFn: favoritesAddendum,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
