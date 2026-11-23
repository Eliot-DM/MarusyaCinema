import { useState } from "react";
import { Secondary } from "../../Components/Button/Secondary/Secondary";
import style from "./Account.module.css";
import { ListFilmFavorite } from "../../Components/FilmFavorite/ListFilmFavorite/ListFilmFavorite";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { getUserLogout } from "../../Api/auth";
import { queryClient } from "../../Api/QueryClient";
import { useUserProfile } from "../../Hooks/useUserProfile";

export const Account = () => {
  const { data: user } = useUserProfile();

  const navigate = useNavigate();
  const logoutMutation = useMutation({
    mutationFn: getUserLogout,
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      navigate("/");
    },
  });
  const [activeSection, setActiveSection] = useState("favorites");

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  if (!user) {
    return (
      <div className={style.account}>
        <div className={style.error}>Пользователь не найден</div>
      </div>
    );
  }

  return (
    <div className={style.account}>
      <h2 className={style.title}>Мой аккаунт</h2>
      <div className={style.listButton}>
        <button
          onClick={() => setActiveSection("favorites")}
          className={style.button}
        >
          <img className={style.img} src="/public/icon/favorite.svg" alt="" />
          Избранные фильмы
        </button>
        <button
          onClick={() => setActiveSection("settings")}
          className={style.button}
        >
          <img className={style.img} src="/public/icon/userWhite.svg" alt="" />
          Настройка аккаунта
        </button>
      </div>
      <div className={style.listButtonSmall}>
        <button
          onClick={() => setActiveSection("favorites")}
          className={style.button}
        >
          <img className={style.img} src="/public/icon/favorite.svg" alt="" />
          Избранное
        </button>
        <button
          onClick={() => setActiveSection("settings")}
          className={style.button}
        >
          <img className={style.img} src="/public/icon/userWhite.svg" alt="" />
          Настройки
        </button>
      </div>
      {activeSection === "favorites" && (
        <div className={style.favoritesSection}>
          <ListFilmFavorite movieId={user.favorites} />
        </div>
      )}

      {activeSection === "settings" && (
        <div className={style.info}>
          <div className={style.infoBlock}>
            <div className={style.fullInfo}>
              <div className={style.imgInfo}>
                {user.name[0]}
                {user.surname[0]}
              </div>
              <div className={style.textBlock}>
                <p className={style.typeInfo}>Имя Фамилия</p>
                <p className={style.textInfo}>
                  {user.name} {user.surname}
                </p>
              </div>
            </div>
            <div className={style.fullInfo}>
              <div className={style.imgInfo}>
                <div className={style.imgEmail}></div>
              </div>
              <div className={style.textBlock}>
                <p className={style.typeInfo}>Электронная почта</p>
                <p className={style.textInfo}>{user.email}</p>
              </div>
            </div>
          </div>
          <Secondary onClick={handleLogout} text={"Выйти из аккаунта"} />
        </div>
      )}
    </div>
  );
};
