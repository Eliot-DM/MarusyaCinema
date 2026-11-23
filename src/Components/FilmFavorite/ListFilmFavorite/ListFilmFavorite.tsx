import type { FC } from "react";
import styles from "./ListFilmFavorite.module.css";
import { CardFilmFavorite } from "../CardFilmFavorite/CardFilmFavorite";

type P = {
  movieId: string[];
};

export const ListFilmFavorite: FC<P> = ({ movieId }) => {
  return (
    <ul className={styles.listFilmFavorite}>
      {movieId.map((film) => (
        <CardFilmFavorite key={film} id={film} />
      ))}
    </ul>
  );
};
