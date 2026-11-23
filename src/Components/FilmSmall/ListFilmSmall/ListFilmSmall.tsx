import type { FC } from "react";
import { CardFilmSmall } from "../CardFilmSmall/CardFilmSmall";
import styles from "./ListFilmSmall.module.css";
import type { Movie } from "../../../Api/schemas";

type P = {
  movie: Movie[];
};

export const ListFilmSmall: FC<P> = ({ movie }) => {
  return (
    <ul className={styles.listFilmSmall}>
      {movie.map((film) => (
        <CardFilmSmall key={film.id} movie={film} />
      ))}
    </ul>
  );
};
