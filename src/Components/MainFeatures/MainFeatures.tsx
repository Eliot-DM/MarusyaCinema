import type { FC } from "react";
import styles from "./MainFeatures.module.css";

type P = {
  rating: number;
  date: number;
  genre: string[];
  time: number;
  big: boolean;
};

export const MainFeatures: FC<P> = ({
  rating,
  date,
  genre,
  time,
  big = true,
}) => {
  const Color = (rating: number) => {
    if (rating >= 8) {
      return styles.yellow;
    } else if (rating < 8 && rating >= 7) {
      return styles.green;
    } else if (rating < 7 && rating >= 5) {
      return styles.gray;
    } else if (rating < 5) {
      return styles.red;
    }
  };

  return big ? (
    <div className={styles.mainFeatures}>
      <div
        className={`${styles.rating}  ${Color(Math.round(rating * 10) / 10)}`}
      >
        <img className={styles.img} src="/public/icon/star.svg" alt=""></img>
        <p className={styles.number}>{Math.round(rating * 10) / 10}</p>
      </div>
      <p className={styles.text}>{date}</p>
      <p className={styles.text}>{genre[0]}</p>
      <p className={styles.text}>{time}</p>
    </div>
  ) : (
    <div className={styles.mainFeaturesSmall}>
      <div
        className={`${styles.ratingSmall}  ${Color(Math.round(rating * 10) / 10)}`}
      >
        <img
          className={styles.imgSmall}
          src={`${import.meta.env.BASE_URL}icon/star.svg`}
          alt=""
        ></img>
        <p className={styles.numberSmall}>{Math.round(rating * 10) / 10}</p>
      </div>
      <p className={styles.textSmall}>{date}</p>
      <p className={styles.textSmall}>{genre}</p>
      <p className={styles.textSmall}>{time}</p>
    </div>
  );
};
