import styles from "./Logo.module.css";

export const Logo = () => {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logoDark.svg`}
      alt=""
      className={styles.logo}
    />
  );
};
