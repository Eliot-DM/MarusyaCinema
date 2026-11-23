import { ListFilmGenre } from "../../Components/FilmGenre/ListFilmGenre/ListFilmGenre";
import "./Genres.module.css";
import style from "./Genres.module.css";

export const Genres = () => {
  return (
    <div className={style.genres}>
      <h2 className={style.title}>Жанры фильмов</h2>
      <ListFilmGenre />
    </div>
  );
};
