import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenreList = () => {
  return api.get(`/genre/movie/list`);
};

export const useMovieGenreListQuery = () => {
  return useQuery({
    queryKey: ['movie-genre-list'],
    queryFn: fetchMovieGenreList,
  });
};
