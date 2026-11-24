import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a className={styles.link}>
            <img
              src={`${import.meta.env.BASE_URL}vk.svg`}
              className={styles.img}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.link}>
            <img
              src={`${import.meta.env.BASE_URL}yt.svg`}
              className={styles.img}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.link}>
            <img
              src={`${import.meta.env.BASE_URL}ok.svg`}
              className={styles.img}
            />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.link}>
            <img
              src={`${import.meta.env.BASE_URL}tg.svg`}
              className={styles.img}
            />
          </a>
        </li>
      </ul>
    </footer>
  );
};
