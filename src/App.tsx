import { Link, Route, Routes } from "react-router-dom";
import { Genres } from "./Pages/Genres/Genres";
import { Layoute } from "./Pages/Layoute/Layoute";
import { Film } from "./Pages/Film/Film";
import { Footer } from "./Components/Footer/Footer";
import { Account } from "./Pages/Account/Account";
import { ListGenre } from "./Components/FilmGenre/ListGenre/ListGenre";
import { Logo } from "./Components/Logo/Logo";
import { InputSearch } from "./Components/Input/InputSearch/InputSearch";
import styles from "./App.module.css";
import { AuthModal } from "./Components/Modal/AuthModal/AuthModal/AuthModal";
import { useState } from "react";
import { useUserProfile } from "./Hooks/useUserProfile";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "./store/store";
import { authOpen } from "./store/AuthModalSlice";
import { formLogin } from "./store/AuthModalFormSlice";

const App = () => {
  const { data: user } = useUserProfile();

  const authModal = useSelector((state: RootState) => state.authModal.value);
  const dispatch = useDispatch();
  const [search, setSearch] = useState<boolean>(false);

  return (
    <div className={styles.app}>
      <nav className={styles.navMenu}>
        <Link to={"/"}>
          <Logo />
        </Link>
        <Link to={"/"} className={styles.link}>
          Главная
        </Link>
        <Link to={"/genres"} className={styles.link}>
          Жанры
        </Link>
        <InputSearch />
        {user ? (
          <Link to={"/account"} className={styles.linkAccount}>
            <span className={styles.userName}>{user.name}</span>
          </Link>
        ) : (
          <button
            onClick={() => {
              dispatch(authOpen());
              dispatch(formLogin());
            }}
            className={styles.link}
          >
            Войти
          </button>
        )}
      </nav>
      <nav className={styles.navMenuSmall}>
        <Link to={"/"}>
          <Logo />
        </Link>
        <div className={styles.menuSmall}>
          <Link to={"/genres"} className={styles.linkGenres}></Link>

          {search ? (
            <InputSearch onClick={() => setSearch(false)} />
          ) : (
            <button
              onClick={() => setSearch(true)}
              className={styles.linkSearch}
            ></button>
          )}

          {user ? (
            <Link to={"/account"} className={styles.linkAccount}></Link>
          ) : (
            <button
              onClick={() => {
                dispatch(authOpen());
                dispatch(formLogin());
              }}
              className={styles.linkUser}
            ></button>
          )}
        </div>
      </nav>
      <div className="section">
        <main className="content">
          {authModal ? <AuthModal /> : null}
          <Routes>
            <Route path="/" element={<Layoute />} />
            <Route path="/genres" element={<Genres />} />
            <Route path="/genres/:genreName" element={<ListGenre />} />
            <Route path="/movie/:movieId" element={<Film />} />
            <Route path="/account" element={<Account />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default App;
