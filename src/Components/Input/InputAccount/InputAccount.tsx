import type { FC } from "react";
import styles from "./InputAccount.module.css";

type P = {
  placeholder: string;
  icon: string;
  error?: string;
};

export const InputAccount: FC<P> = ({ placeholder, icon, error, ...props }) => {
  const Icon = (icon: string) => {
    switch (icon) {
      case "email":
        return styles.email;
      case "user":
        return styles.user;
      case "password":
        return styles.password;
      default:
        return "";
    }
  };

  return (
    <div className={styles.inputAccount}>
      <input
        className={`${styles.input}  ${error ? styles.error : ""}`}
        type={icon === "password" ? "password" : "text"}
        placeholder={placeholder}
        {...props}
      />
      <div className={`${styles.svg}  ${Icon(icon)}`}></div>
    </div>
  );
};
