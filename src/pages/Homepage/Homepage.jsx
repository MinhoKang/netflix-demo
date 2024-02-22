import React from 'react';
import Banner from './components/Banner/Banner';
import PopularMovieSlide from './components/PopularMoiveSlide/PopularMovieSlide';
import TopRatedMovieSlide from './components/TopRatedMovieSlide/TopRatedMovieSlide';

const Homepage = () => {
  return (
    <div>
      <Banner />
      <PopularMovieSlide />
      <TopRatedMovieSlide/>
    </div>
  );
};

export default Homepage;
