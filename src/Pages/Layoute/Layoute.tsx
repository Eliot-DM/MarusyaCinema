import { CardFilm } from "../../Components/FullCardFilm/FullCardFilm";
import style from "./Layoute.module.css";
import { ListFilmTop } from "../../Components/FilmTop/ListFilm/ListFilmTop";

export const Layoute = () => {
  return (
    <div>
      <CardFilm />
      <h2 className={style.title}>Топ 10 фильмов</h2>
      <ListFilmTop />
    </div>
  );
};
