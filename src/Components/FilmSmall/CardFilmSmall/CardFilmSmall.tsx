import type { FC } from "react";
import { MainFeatures } from "../../MainFeatures/MainFeatures";
import styles from "./CardFilmSmall.module.css";
import type { Movie } from "../../../Api/schemas";
import { Link } from "react-router";

type P = {
  movie?: Movie;
};

export const CardFilmSmall: FC<P> = ({ movie }) => {
  if (!movie) {
    return null;
  }

  return (
    <Link className={styles.cardFilmSmall} to={`/movie/${movie.id}`}>
      <img src={movie.posterUrl} alt="" className={styles.img} />
      <div className={styles.info}>
        <MainFeatures
          rating={movie.tmdbRating}
          date={movie.relaseYear}
          genre={movie.genres}
          time={movie.runtime}
          big={false}
        />
        <p className={styles.title}>{movie.title}</p>
      </div>
    </Link>
  );
};
