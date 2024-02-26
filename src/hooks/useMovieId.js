import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieId = ({ id }) => {
  return api.get(`/movie/${id}`);
};

export const useMovieIdQuery = ({ id }) => {
  return useQuery({
    queryKey: ['movie-id'],
    queryFn: () => fetchMovieId({ id }),
  });
};
