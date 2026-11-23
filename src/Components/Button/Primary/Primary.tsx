import type { FC } from "react";
import styles from "./Primary.module.css";

type P = {
  text: string;
  onClick?: () => void;
};

export const Primary: FC<P> = ({ text, onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      {text}
    </button>
  );
};
