import React from 'react';
import Carousel from 'react-multi-carousel';
import MovieCard from '../MovieCard/MovieCard';

const MovieSlider = ({ title, movies, responsive }) => {
  return (
    <div>
      <div>
        <h3>{title}</h3>
        <Carousel
          infinite={true}
          centerMode={true}
          itemClass="movie-slider p-1"
          containerClass="carousel-container"
          responsive={responsive}
        >
          {movies?.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default MovieSlider;
