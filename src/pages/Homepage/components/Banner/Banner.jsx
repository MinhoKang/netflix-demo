import React from 'react';
import { usePopularMoviesQuery } from '../../../../hooks/usePopularMovies';
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components';
import './Banner.style.css';

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  console.log(data);
  if (isLoading) {
    <h1>로딩중...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  // const backgroundImage = data?.results[3]?.poster_path;

  return (
    <div
      style={{
        backgroundImage:
          'url(' +
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0]?.poster_path}` +
          ')',
      }}
      className="banner"
    >
      <div className="text-white banner-text-area">
        <h1>{data?.results[0]?.title}</h1>
        <p>{data?.results[0]?.overview}</p>
      </div>
    </div>
    // <BannerContainer backgroundimg={backgroundImage}>
    //   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quod nisi explicabo ipsa
    //   doloribus neque quo ipsum sequi illum assumenda quos id tenetur quibusdam, voluptatibus ullam
    //   porro enim optio exercitationem.
    // </BannerContainer>
  );
};

export default Banner;

// const BannerContainer = styled.section`
//   background-image: url(${(props) => props.backgroundimg});
// `;
// const BannerContainer = styled.section`
//   background-image: ${(props) =>
//     `url(https://media.themoviedb.org/t/p/w533_and_h300_bestv2${props.backgroundimg}')`};
// `;
