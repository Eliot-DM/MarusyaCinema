import type { FC } from "react";
import styles from "./Favorite.module.css";
import { useMutation } from "@tanstack/react-query";
import { favoritesAddendum } from "../../Api/favorites";
import { queryClient } from "../../Api/QueryClient";

type P = {
  movieId: string;
  favorite: boolean;
};

export const Favorite: FC<P> = ({ movieId, favorite = true }) => {
  const mutation = useMutation(
    {
      mutationFn: favoritesAddendum,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["favorite"] });
      },
    },
    queryClient
  );

  return (
    <button
      className={styles.favorite}
      onClick={() => mutation.mutate(movieId)}
    >
      <svg className={favorite ? styles.imgYes : styles.img} />
    </button>
  );
};
