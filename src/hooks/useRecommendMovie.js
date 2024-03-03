import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchRelatedMovie = ({ id }) => {
  return api.get(`/movie/${id}/recommendations`);
};

export const useRelatedMovieQuery = ({ id }) => {
  return useQuery({
    queryKey: ['movie-related'],
    queryFn: () => fetchRelatedMovie({ id }),
    select: (result) => result?.data?.results,
  });
};
