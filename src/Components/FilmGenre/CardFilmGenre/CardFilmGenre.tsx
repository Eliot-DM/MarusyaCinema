import type { FC } from "react";
import styles from "./CardFilmGenre.module.css";
import { useNavigate } from "react-router-dom";

type P = {
  img: string;
  genre: string;
};

export const CardFilmGenre: FC<P> = ({ img, genre }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/genres/${encodeURIComponent(genre)}`);
  };

  return (
    <li className={styles.cardFilmGenre} onClick={handleClick}>
      <img className={styles.img} src={img} alt={`Жанр: ${genre}`} />
      <p className={styles.text}>{genre}</p>
    </li>
  );
};
