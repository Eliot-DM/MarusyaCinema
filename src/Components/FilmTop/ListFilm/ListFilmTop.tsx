import { CardFilm } from "../CardFilm/CardFilm";
import styles from "./ListFilmTop.module.css";
import { useQuery } from "@tanstack/react-query";
import { getMovieTop } from "../../../Api/movies";

export const ListFilmTop = () => {
  const { data: topMovies = [] } = useQuery({
    queryKey: ["topMovies"],
    queryFn: getMovieTop,
  });

  return (
    <ul className={styles.listFilm}>
      {topMovies.map((film) => (
        <CardFilm key={film.id} movie={film} />
      ))}
    </ul>
  );
};
