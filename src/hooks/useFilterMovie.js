import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularityFilter = ({ popularity, page }) => {
  return api.get(
    `/discover/movie?sort_by=${popularity}&page=${page}
    `
  );
};

export const useFilterPopularityMovieQuery = ({
  popularity,
  page,
  keyword,
  genre,
}) => {
  return useQuery({
    queryKey: ["movie-filter-popularity", { popularity, page }],
    queryFn: () => fetchPopularityFilter({ popularity, page }),
    select: (result) => result.data,
  });
};
