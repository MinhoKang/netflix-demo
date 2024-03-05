import { useQuery } from "@tanstack/react-query";
import api from "../utils/api";

const fetchSearchMovie = ({ keyword, page }) => {
  return keyword
    ? api.get(`/search/movie?query=${keyword}&page=${page}`)
    : api.get(`/movie/popular?page=${page}`);
};

export const useSearchMovieQuery = ({ keyword, page }) => {
  return useQuery({
    queryKey: ["movie-search", { keyword, page }],
    queryFn: () => fetchSearchMovie({ keyword, page }),
    select: (result) => result.data,
  });
};



// const fetchSearchMovieRaw = async ({ keyword }) => {
//   const response = await api.get(`/search/movie?query=${keyword}`);
//   // 비동기 처리를 해야 데이터를 받아온 후 출력 가능
//   const rawData = response.data;
//   // return rawData.sort((a, b) => b.popularity - a.popularity);
//   // return rawData;
//   return rawData.results.sort((a, b) => b.popularity - a.popularity);
// };

// export const useSearchMovieRawQuery = ({ keyword }) => {
//   return useQuery({
//     queryKey: ["movie-search-raw"],
//     queryFn: () => fetchSearchMovieRaw({ keyword }),
//   });
// };
