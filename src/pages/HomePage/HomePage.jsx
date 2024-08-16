import { useState, useEffect } from 'react';
import css from './HomePage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import { trendingMovies } from '../../TMDB-APPI';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await trendingMovies();
        setMovies(data.results);
        console.log(data.results);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div className={css.homePageContainer}>
      {isError && <ErrorMessage />}
      <h2 className={css.titleHomePage}>Trending week</h2>
      {isLoading && <Loader />}
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
