import type { FC } from "react";
import styles from "./CardFilmParameter.module.css";

type P = {
  title: string;
  chapter: string;
};

export const CardFilmParameter: FC<P> = ({ title, chapter }) => {
  return (
    <li className={styles.item}>
      <p className={styles.title}>{title}</p>
      <p className={styles.chapter}>{chapter}</p>
    </li>
  );
};
