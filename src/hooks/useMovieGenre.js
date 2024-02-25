import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieGenre = () => {
  return api.get('/genre/movie/list');
};

export const useMovieGenreQuery = () => {
  return useQuery({
    qeuryKey: ['movie-genre'],
    queryFn: fetchMovieGenre,
    select: (result) => result.data.genres,
    staleTime: 30000,
  });
};
