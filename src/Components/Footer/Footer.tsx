import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <ul className={styles.list}>
        <li className={styles.item}>
          <a className={styles.link}>
            <img src="/public/vk.svg" className={styles.img} />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.link}>
            <img src="/public/yt.svg" className={styles.img} />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.link}>
            <img src="/public/ok.svg" className={styles.img} />
          </a>
        </li>
        <li className={styles.item}>
          <a className={styles.link}>
            <img src="/public/tg.svg" className={styles.img} />
          </a>
        </li>
      </ul>
    </footer>
  );
};
