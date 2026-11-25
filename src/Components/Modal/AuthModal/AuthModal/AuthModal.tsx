import styles from "./AuthModal.module.css";
import { RegisterForm } from "../RegisterForm/RegisterForm";
import { LoginForm } from "../LoginForm/LoginForm";
import { RegisterEnd } from "../RegisterEnd/RegisterEnd";
import { authExit } from "../../../../store/AuthModalSlice";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../../../store/store";
import {
  formLogin,
  formNull,
  formRegister,
} from "../../../../store/AuthModalFormSlice";

export const AuthModal = () => {
  const authModalForm = useSelector(
    (state: RootState) => state.authModalForm.value,
  );
  const dispatch = useDispatch();

  const renderContent = () => {
    switch (authModalForm) {
      case "register":
        return <RegisterForm />;
      case "login":
        return <LoginForm />;
      case "registerEnd":
        return <RegisterEnd />;
      default:
        return null;
    }
  };

  return (
    <div className={styles.authModal}>
      <button
        className={styles.exit}
        onClick={() => {
          dispatch(formNull());
          dispatch(authExit());
        }}
      >
        <img src={`${import.meta.env.BASE_URL}icon/exit.svg`} alt="" />
      </button>
      <img
        className={styles.logo}
        src={`${import.meta.env.BASE_URL}logoLight.png`}
        alt=""
      />
      {renderContent()}
      {authModalForm == "login" && (
        <button
          className={styles.button}
          onClick={() => dispatch(formRegister())}
        >
          Создать аккаунт
        </button>
      )}

      {authModalForm == "register" && (
        <button className={styles.button} onClick={() => dispatch(formLogin())}>
          У меня есть аккаунт
        </button>
      )}
    </div>
  );
};
