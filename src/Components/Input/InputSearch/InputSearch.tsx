import { ListFilmSmall } from "../../FilmSmall/ListFilmSmall/ListFilmSmall";
import styles from "./InputSearch.module.css";
import { useDebounce } from "../../../Hooks/useDebounce";
import { useState, type FC } from "react";
import { useQuery } from "@tanstack/react-query";
import { getMovies } from "../../../Api/movies";

type P = {
  onClick?: () => void;
};

export const InputSearch: FC<P> = ({ onClick }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedQuery = useDebounce(searchQuery);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const { data: movies = [] } = useQuery({
    queryKey: ["movies", "search", debouncedQuery],
    queryFn: () =>
      getMovies({
        title: debouncedQuery,
        count: 5,
      }),
  });

  return (
    <div className={styles.inputSearch}>
      <input
        className={styles.input}
        type="text"
        placeholder="Поиск"
        value={searchQuery}
        onChange={handleInputChange}
      />
      <div className={styles.svgSearch}></div>
      {searchQuery && (
        <button
          className={styles.svgExit}
          onClick={() => {
            setSearchQuery("");
            onClick?.();
          }}
        ></button>
      )}

      {debouncedQuery.length >= 2 && <ListFilmSmall movie={movies} />}
    </div>
  );
};
