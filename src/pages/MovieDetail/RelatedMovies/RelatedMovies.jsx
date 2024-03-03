import React from 'react';
import { useRelatedMovieQuery } from '../../../hooks/useRecommendMovie';
import MovieCard from '../../../common/MovieCard/MovieCard';
import styled from 'styled-components';

const RelatedMovies = ({ id }) => {
  const { data, isLoading, isError } = useRelatedMovieQuery({ id });
  console.log(data);
  return (
    <div>
      <GridBox>
        {data?.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </GridBox>
    </div>
  );
};

export default RelatedMovies;

const GridBox = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
`;
