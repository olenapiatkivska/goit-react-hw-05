import { useState, useEffect } from 'react';
import { reviewsMovies } from '../../TMDB-APPI';
import { useParams } from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import ErrorMessage from '../../components/ErrorMessage/ErrorMessage';
import defaultAvatar from '../../img/avatar-default.svg';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const { movieId } = useParams();

  useEffect(() => {
    async function getMoviesReviews() {
      try {
        setIsError(false);
        setIsLoading(true);
        const data = await reviewsMovies(movieId);
        setReviews(data.results);
        console.log(data.results);
      } catch (error) {
        setIsError(true);
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
    getMoviesReviews();
  }, [movieId]);
  // console.log(results);
  return (
    <>
      {isError && <ErrorMessage />}
      {isLoading && <Loader />}

      {reviews.length > 0 ? (
        <ul className={css.reviewList}>
          {reviews.map(review => {
            return (
              <li key={review.id} className={css.reviewListItem}>
                <img
                  className={css.reviewImg}
                  src={
                    review.author_details.avatar_path
                      ? `https://image.tmdb.org/t/p/w200${review.author_details.avatar_path}`
                      : defaultAvatar
                  }
                  alt={review.author}
                />
                <div className={css.infoContainer}>
                  <p className={css.reviewAuthor}>
                    {review.author}&nbsp;
                    <span>
                      (user rating:&nbsp;
                      {review.author_details.rating
                        ? review.author_details.rating
                        : 'unrated'}
                      )
                    </span>
                  </p>
                  <p className={css.reviewContent}>{review.content}</p>
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className={css.reviewAuthor}>There are no reviews.</p>
      )}
    </>
  );
};

export default MovieReviews;
