import { searchMovies } from '../../TMDB-APPI';
import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import Loader from '../../components/Loader/Loader';
import SearchFormMovie from '../../components/SearchFormMovie/SearchFormMovie';
import MovieList from '../../components/MovieList/MovieList';
import { useSearchParams } from 'react-router-dom';
import PaginationBtnNext from '../../components/PaginationBtnNext/PaginationBtnNext';
import PaginationBtn from '../../components/PaginationBtn/PaginationBtn';
import css from './MoviesPage.module.css';

const MoviesPage = () => {
  const [foundMovies, setFoundMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoadMore, setIsLoadMore] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(1);
  const query = searchParams.get('query') ?? '';
  const page = searchParams.get('page') ?? '';
  const mainElemRef = useRef();

  useEffect(() => {
    if (query === '') return;
    async function getMovieByQueryData() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await searchMovies(query, page);
        if (data.results.length === 0) {
          toast('No results found. Please check your query.');
          return;
        }
        setFoundMovies(data.results);
        setTotalPages(data.total_pages);
        setIsLoadMore(data.total_pages >= page);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMovieByQueryData();
    setSearchParams({ query, page });
  }, [query, page, setSearchParams]);

  const handleSearch = newQuery => {
    setSearchParams({
      query: newQuery,
      page: 1,
    });
  };

  const handlePageChange = newPage => {
    setSearchParams({ query, page: newPage });
  };

  useEffect(() => {
    if (page === 1) return;
    mainElemRef.current.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [foundMovies, page]);

  return (
    <div ref={mainElemRef}>
      <SearchFormMovie onSearch={handleSearch} />
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}
      <MovieList movies={foundMovies} />
      {isLoadMore && (
        <div className={css.paginationBtnContainer}>
          {page > 1 && (
            <PaginationBtn onBtnClick={handlePageChange} page={Number(page)} />
          )}
          {totalPages > page && (
            <PaginationBtnNext
              onBtnClick={handlePageChange}
              page={Number(page)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
