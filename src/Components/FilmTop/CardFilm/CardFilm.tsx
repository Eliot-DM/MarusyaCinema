import type { FC } from "react";
import styles from "./CardFilm.module.css";
import { Link } from "react-router-dom";
import type { Movie } from "../../../Api/schemas";

type P = {
  movie: Movie;
};

export const CardFilm: FC<P> = ({ movie }) => {
  return (
    <Link to={`/movie/${movie.id}`}>
      <li className={styles.filmTop}>
        <div className={styles.rating}>
          {Math.round(movie.tmdbRating * 10) / 10}
        </div>
        <img className={styles.img} src={movie.posterUrl} alt="" />
      </li>
    </Link>
  );
};
