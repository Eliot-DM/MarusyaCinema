import styles from "./ListFilmGenre.module.css";
import { CardFilmGenre } from "../CardFilmGenre/CardFilmGenre";
import { getMovieGenres, getMovies } from "../../../Api/movies";
import { useQueries, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../../Api/QueryClient";

export const ListFilmGenre = () => {
  const { data: movieGenres = [] } = useQuery(
    { queryKey: ["movieGenres"], queryFn: getMovieGenres },
    queryClient,
  );

  const moviesQueries = useQueries({
    queries: movieGenres.map((genre, index) => ({
      queryKey: ["movies", genre],
      queryFn: () => getMovies({ genre, count: index + 1 }),
      enabled: !!genre,
    })),
  });

  return (
    <ul className={styles.listFilmGenre}>
      {movieGenres.map((genre, index) => {
        const { data: movies = [] } = moviesQueries[index];
        const movieIndex = index % (movies.length || 1);
        const firstMovie = movies[movieIndex];
        const imageUrl = firstMovie?.backdropUrl || "";

        return <CardFilmGenre key={genre} img={imageUrl} genre={genre} />;
      })}
    </ul>
  );
};
