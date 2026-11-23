import { useState } from "react";
import { Primary } from "../Button/Primary/Primary";
import { MainFeatures } from "../MainFeatures/MainFeatures";
import styles from "./FullCardFilm.module.css";
import { Link } from "react-router";
import { TrailerModal } from "../Modal/TrailerModal/TrailerModal";
import { useUserProfile } from "../../Hooks/useUserProfile";
import { useFavoritesAdd } from "../../Hooks/useFavoritesAdd";
import { useDispatch } from "react-redux";
import { authOpen } from "../../store/AuthModalSlice";
import { useQuery } from "@tanstack/react-query";
import { getMovieRandom } from "../../Api/movies";
import { formLogin } from "../../store/AuthModalFormSlice";
import { useFavoritesDelete } from "../../Hooks/useFavoritesDelete";

export const CardFilm = () => {
  const { data: user } = useUserProfile();
  const mutationFavoritesAdd = useFavoritesAdd();
  const mutationFavoritesDelete = useFavoritesDelete();
  const { data: movieRandom, refetch: refetchRandom } = useQuery({
    queryKey: ["movieRandom"],
    queryFn: getMovieRandom,
  });
  const handleRandomClick = () => {
    refetchRandom();
  };
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const movieIdStr = String(movieRandom?.id);
  const isFavorite = user?.favorites.includes(movieIdStr) ?? false;

  if (!movieRandom) {
    return null;
  }

  return (
    <div className={styles.cardFilm}>
      {showModal && (
        <TrailerModal
          videoId={movieRandom.trailerYouTubeId}
          onClick={() => setShowModal(false)}
          name={movieRandom?.title}
          videoUrl={movieRandom.trailerUrl}
        />
      )}

      <div className={styles.info}>
        <MainFeatures
          rating={movieRandom.tmdbRating}
          date={movieRandom.relaseYear}
          genre={movieRandom.genres}
          time={movieRandom.runtime}
          big={true}
        />
        <h2 className={styles.title}>{movieRandom.title}</h2>
        <p className={styles.text}>{movieRandom.plot}</p>
        <div className={styles.buttons}>
          <button className={styles.primary} onClick={() => setShowModal(true)}>
            Трейлер
          </button>

          <div className={styles.buttonsBottom}>
            <Link to={`/movie/${movieRandom.id}`}>
              <Primary text={"О фильме"} />
            </Link>
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
            <button className={styles.random} onClick={handleRandomClick}>
              <svg className={styles.randomSvg} />
            </button>
          </div>
        </div>
      </div>
      <img className={styles.img} src={movieRandom.backdropUrl} alt="" />
    </div>
  );
};
