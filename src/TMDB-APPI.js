import axios from 'axios';

const moviesApi = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNjE5OWUwODYyZmE2NDk2OWY3M2ZlMDJlNGRhZmYwOSIsIm5iZiI6MTcyMzE0Mjk3NC4xMTcwMzQsInN1YiI6IjY2YjUwZWFlOTNkYTFiOWMxYmNiNjc3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tY9x4g-i8t3zsdw8zTowj45IDOTuB3jOaDkmQtW802I',
  },
});

export async function trendingMovies() {
  const { data } = await moviesApi.get('trending/movie/week');
  return data;
}

export async function searchMovies(query, page) {
  const params = { query, page };
  const { data } = await moviesApi.get('search/movie', { params });
  return data;
}
export async function detailsMovies(movieId) {
  const { data } = await moviesApi.get(`movie/${movieId}`);
  return data;
}
export async function creditsMovies(movieId) {
  const { data } = await moviesApi.get(`movie/${movieId}/credits`);
  return data;
}
export async function reviewsMovies(movieId, page) {
  const params = { page };
  const { data } = await moviesApi.get(`movie/${movieId}/reviews`, { params });
  return data;
}
