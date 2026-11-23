import styles from "./ListGenre.module.css";
import { CardFilm } from "../../FilmTop/CardFilm/CardFilm";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../../Api/movies";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../Api/QueryClient";
import { useState } from "react";

export const ListGenre = () => {
  const { genreName } = useParams<{ genreName: string }>();

  const { data: movies = [] } = useQuery(
    {
      queryKey: ["movies", "genre", genreName],
      queryFn: () => getMovies({ genre: genreName }),
      enabled: !!genreName,
    },
    queryClient,
  );

  const genreMovies = movies.filter((film) =>
    film.genres.some((genres) => genres === genreName),
  );

  const [visibleCount, setVisibleCount] = useState(10);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  const visibleItems = genreMovies.slice(0, visibleCount);
  const hasMore = visibleCount < genreMovies.length;

  return (
    <div className={styles.genrePage}>
      <h1 className={styles.title}>Фильмы в жанре: {genreName}</h1>
      <h1 className={styles.titleGenre}>{genreName}</h1>
      <ul className={styles.listFilm}>
        {visibleItems.map((film) => (
          <CardFilm key={film.id} movie={film} />
        ))}
      </ul>
      {hasMore && (
        <button className={styles.button} onClick={loadMore}>
          Показать еще 10
        </button>
      )}
    </div>
  );
};
