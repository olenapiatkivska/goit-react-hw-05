import { Link, useLocation } from 'react-router-dom';
import movieDefault from '../../img/movie.svg';
import css from './MovieCard.module.css';

const MovieCard = ({ movie }) => {
  const location = useLocation();
  return (
    <Link className={css.movieCard} to={`/movies/${movie.id}`} state={location}>
      <div className={css.boxMovieCard}>
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
              : movieDefault
          }
          alt={movie.title}
        />
      </div>
    </Link>
  );
};

export default MovieCard;
