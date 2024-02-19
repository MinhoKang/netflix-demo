import React, { useEffect, useRef, useState } from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from '../MovieCard/MovieCard';
import './PopularMovieSlide.style.css';

const PopularMovieSlide = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data?.results);

  if (isLoading) {
    return <h1>로딩중...</h1>;
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 6,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div>
      <h3>Popular Movies</h3>
      <Carousel
        infinite={true}
        centerMode={true}
        itemClass="movie-slider p-1"
        containerClass="carousel-container"
        responsive={responsive}
      >
        {data?.results?.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </Carousel>
    </div>
  );
};

export default PopularMovieSlide;
