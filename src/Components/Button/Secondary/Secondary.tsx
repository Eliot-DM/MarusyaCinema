import type { FC } from "react";
import styles from "./Secondary.module.css";

type P = {
  text: string;
  type?: "submit" | "reset" | "button";
  onClick?: () => void;
  onSubmit?: () => void;
  disabled?: boolean;
};

export const Secondary: FC<P> = ({
  text,
  type,
  onClick,
  onSubmit,
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      onSubmit={onSubmit}
      type={type}
      className={styles.button}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
