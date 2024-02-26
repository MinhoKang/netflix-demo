import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useMovieIdQuery } from '../../hooks/useMovieId';
import { Col, Container, Row } from 'react-bootstrap';
import styled from 'styled-components';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';

const MovieDetail = () => {
  let { id } = useParams();

  const { data, isLoading, isError, error } = useMovieIdQuery({ id });
  const movieData = data?.data;

  const { data: genreData } = useMovieGenreQuery();
  console.log(genreData);
  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
  };

  return (
    <Container>
      <InnerContainer>
        <ImgContainer imgurl={movieData?.poster_path} />
        <div>
          {}
          <h1>{movieData?.title}</h1>
          <p>{movieData?.tagline}</p>
        </div>
      </InnerContainer>
    </Container>
  );
};

export default MovieDetail;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ImgContainer = styled.section`
  /* src: ${({ imgurl }) => `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${imgurl})`};
  width: 100%;
  height: 100%; */
  background-image: ${({ imgurl }) =>
    `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${imgurl})`};
  width: 300px;
  height: 450px;
`;
