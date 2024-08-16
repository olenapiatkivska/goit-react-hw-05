import { detailsMovies } from '../../TMDB-APPI';
import { useState, useEffect, useRef, Suspense } from 'react';
import {
  useLocation,
  Link,
  Outlet,
  NavLink,
  useParams,
} from 'react-router-dom';
import { HiArrowLeft } from 'react-icons/hi';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import movieDefault from '../../img/movie.svg';
import css from './MovieDetailsPage.module.css';
import clsx from 'clsx';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  const location = useLocation();
  const backLinkHref = useRef(location.state ?? '/');

  useEffect(() => {
    async function getMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await detailsMovies(movieId);
        setMovie(data);
        // console.log(data);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, [movieId]);
  // console.log(movie);
  return (
    <main>
      <Link to={backLinkHref.current} className={css.btnGoBack}>
        <HiArrowLeft size="24" />
        Go back
      </Link>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <div className={css.movieDetailswrapp}>
        <img
          className={css.PosterImg}
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
              : movieDefault
          }
          alt={movie.title}
        />

        <div className={css.movieDetailsDescription}>
          <h2 className={css.movieDetailsTitle}>{movie.title}</h2>
          <p className={css.movieDetailsText}>{movie.overview}</p>
        </div>
      </div>

      <ul className={css.listLinkMovieDetails}>
        <li>
          <NavLink to="cast" className={buildLinkClass}>
            Cast
          </NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={buildLinkClass}>
            Reviews
          </NavLink>
        </li>
      </ul>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </main>
  );
};

export default MovieDetailsPage;
