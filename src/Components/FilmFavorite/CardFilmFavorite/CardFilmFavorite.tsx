import type { FC } from "react";
import styles from "./CardFilmFavorite.module.css";
import { Link } from "react-router-dom";
import { useMovie } from "../../../Hooks/useMovie";
import { useFavoritesDelete } from "../../../Hooks/useFavoritesDelete";

type P = {
  id: string;
};

export const CardFilmFavorite: FC<P> = ({ id }) => {
  const { data: movie } = useMovie(id);
  const mutationFavoritesDelete = useFavoritesDelete();

  if (!movie) {
    return null;
  }

  return (
    <li className={styles.cardFilmFavorite}>
      <div className={styles.rating}>{movie.tmdbRating}</div>
      <button
        className={styles.delete}
        onClick={() => {
          mutationFavoritesDelete.mutate(id);
        }}
      ></button>
      <Link to={`/movie/${id}`}>
        <img className={styles.img} src={movie.posterUrl} alt="" />
      </Link>
    </li>
  );
};
