import React from 'react';
import MovieSlider from '../../../../common/MovieSlider/MovieSlider';
import { useTopRatedMoviesQuery } from '../../../../hooks/useTopRatedMovies';
import Alert from 'react-bootstrap/Alert';
import { responsive } from '../../../../constants/responsive';

const TopRatedMovieSlide = () => {
  const { data, isLoading, isError, error } = useTopRatedMoviesQuery();
  console.log(data.results);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  return (
    <div>
      <MovieSlider title="Top-rated Movies" movies={data.results} responsive={responsive} />
    </div>
  );
};

export default TopRatedMovieSlide;
