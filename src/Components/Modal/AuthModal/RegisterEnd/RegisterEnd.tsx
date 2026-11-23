import { useDispatch } from "react-redux";
import { Secondary } from "../../../Button/Secondary/Secondary";
import styles from "./RegisterEnd.module.css";
import { formLogin } from "../../../../store/AuthModalFormSlice";

export const RegisterEnd = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.RegisterEnd}>
      <p className={styles.title}>Регистрация завершена</p>
      <p className={styles.text}>
        Используйте вашу электронную почту для входа
      </p>
      <Secondary text={"Войти"} onClick={() => dispatch(formLogin())} />
    </div>
  );
};
