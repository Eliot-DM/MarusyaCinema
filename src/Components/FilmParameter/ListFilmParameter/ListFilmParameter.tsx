import type { FC } from "react";
import styles from "./ListFilmParameter.module.css";
import { CardFilmParameter } from "../CardFilmParameter/CardFilmParameter";
import type { Movie } from "../../../Api/schemas";

type P = {
  movie: Movie;
};

export const ListFilmParameter: FC<P> = ({ movie }) => {
  return (
    <ul className={styles.listFilmParameter}>
      <CardFilmParameter title={"Язык оригинала"} chapter={movie.language} />
      <CardFilmParameter title={"Бюджет"} chapter={movie.budget} />
      <CardFilmParameter title={"Выручка"} chapter={movie.revenue} />
      <CardFilmParameter title={"Режиссёр"} chapter={movie.director} />
      <CardFilmParameter title={"Продакшен"} chapter={movie.production} />
      <CardFilmParameter title={"Награды"} chapter={movie.awardsSummary} />
    </ul>
  );
};
