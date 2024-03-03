import { useQuery } from '@tanstack/react-query';
import api from '../utils/api';

const fetchMovieVideoId = ({ id }) => {
  return api.get(`movie/${id}/videos`);
};

export const useMovieVideoIdQuery = ({ id }) => {
  return useQuery({
    queryKey: ['movie-video-id'],
    queryFn: () => fetchMovieVideoId({ id }),
    select: (result) => result.data,
  });
};
