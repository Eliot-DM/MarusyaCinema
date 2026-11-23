import { MainFeatures } from "../../Components/MainFeatures/MainFeatures";
import styles from "./Film.module.css";
import { useParams } from "react-router";
import { ListFilmParameter } from "../../Components/FilmParameter/ListFilmParameter/ListFilmParameter";
import { useMovie } from "../../Hooks/useMovie";
import { useUserProfile } from "../../Hooks/useUserProfile";
import { useFavoritesAdd } from "../../Hooks/useFavoritesAdd";
import { useFavoritesDelete } from "../../Hooks/useFavoritesDelete";
import { useDispatch } from "react-redux";
import { authOpen } from "../../store/AuthModalSlice";
import { useState } from "react";
import { TrailerModal } from "../../Components/Modal/TrailerModal/TrailerModal";
import { formLogin } from "../../store/AuthModalFormSlice";

export const Film = () => {
  const { movieId } = useParams<{ movieId: string | undefined }>();
  const { data: user } = useUserProfile();
  const { data: movie } = useMovie(movieId);
  const movieIdStr = String(movieId);
  const isFavorite = user?.favorites.includes(movieIdStr) ?? false;
  const mutationFavoritesDelete = useFavoritesDelete();
  const mutationFavoritesAdd = useFavoritesAdd();

  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  if (!movie) {
    return <div>Фильм не найден</div>;
  }

  return (
    <div className={styles.film}>
      {showModal && (
        <TrailerModal
          videoUrl={movie.trailerUrl}
          videoId={movie.trailerYouTubeId}
          onClick={() => setShowModal(false)}
          name={movie?.title}
        />
      )}
      <div className={styles.cardFilm}>
        <div className={styles.info}>
          <MainFeatures
            rating={movie.tmdbRating}
            date={movie.relaseYear}
            genre={movie.genres}
            time={movie.runtime}
            big={true}
          />
          <h2 className={styles.title}>{movie.title}</h2>
          <p className={styles.text}>{movie.plot}</p>
          <div className={styles.buttons}>
            <button
              className={styles.primary}
              onClick={() => setShowModal(true)}
            >
              Трейлер
            </button>
            <button
              className={styles.favorite}
              onClick={() => {
                if (!user) {
                  {
                    dispatch(authOpen());
                    dispatch(formLogin());
                  }
                  return;
                }
                if (isFavorite) {
                  mutationFavoritesDelete.mutate(movieIdStr);
                } else {
                  mutationFavoritesAdd.mutate(movieIdStr);
                }
              }}
            >
              {isFavorite ? (
                <svg className={styles.imgYes} />
              ) : (
                <svg className={styles.imgNo} />
              )}
            </button>
          </div>
        </div>
        <img className={styles.img} src={movie.backdropUrl} alt="" />
      </div>
      <div>
        <h2 className={styles.film}>О фильме</h2>
        <div>
          <ListFilmParameter movie={movie} />
        </div>
      </div>
    </div>
  );
};
