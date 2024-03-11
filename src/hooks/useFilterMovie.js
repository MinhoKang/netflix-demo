import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchPopularityFilter = ({ popularity, page, keyword }) => {
  return api.get(
    `/discover/movie?sort_by=${popularity}&page=${page}
    `
  );
};

export const useFilterPopularityMovieQuery = ({
  popularity,
  page,
    keyword,
}) => {
  return useQuery({
    queryKey: ["movie-filter-popularity", { popularity, page,keyword }],
    queryFn: () => fetchPopularityFilter({ popularity, page,keyword }),
    select: (result) => result.data,
  });
};
