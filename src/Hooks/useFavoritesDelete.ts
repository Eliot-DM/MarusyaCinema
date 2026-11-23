import { useMutation } from "@tanstack/react-query";
import { deleteFavorites } from "../Api/favorites";
import { queryClient } from "../Api/QueryClient";

export const useFavoritesDelete = () => {
  return useMutation({
    mutationFn: deleteFavorites,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
