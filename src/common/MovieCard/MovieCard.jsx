import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './MovieCard.style.css';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { useMovieGenreQuery } from '../../hooks/useMovieGenre';
import { useNavigate, useParams } from 'react-router-dom';

const MovieCard = ({ movie }) => {
  const { data: genreData } = useMovieGenreQuery();
  const navigate = useNavigate();
  const showGenre = (genreIdList) => {
    if (!genreData) {
      return [];
    }
    const genreNameList = genreIdList.map((id) => {
      const genreObj = genreData.find((genre) => genre.id === id);
      return genreObj.name;
    });
    return genreNameList;
  };

  return (
    <MovieCardContainer
      imgurl={movie.poster_path}
      hoverimgurl={movie.backdrop_path}
      onClick={() => navigate(`/movies/${movie.id}`)}
    >
      <Overlay>
        <h1>{movie.title}</h1>
        {showGenre(movie.genre_ids).map((genre, index) => (
          <Badge bg="danger" key={index} style={{ marginRight: '8px' }}>
            {genre}
          </Badge>
        ))}
        <div>
          <div>
            <Vote>VOTE</Vote> {movie.vote_average}
          </div>
          {/* 평점 */}
          <div>
            <FontAwesomeIcon icon={faUsers} /> {movie.popularity}
          </div>
          {/* 인기도 */}
          <div>
            {movie.adult ? (
              <IsAdult bgcolor={'#AA2F3E'} width={'20px'}>
                18
              </IsAdult>
            ) : (
              <IsAdult bgcolor={'#EDBE49'} width={'25px'}>
                All
              </IsAdult>
            )}
          </div>
        </div>
      </Overlay>
    </MovieCardContainer>
  );
};

export default MovieCard;

const MovieCardContainer = styled.div`
  background-image: ${({ imgurl }) =>
    `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${imgurl})`};
  width: 220px;
  height: 330px;
  background-size: cover;
  cursor: pointer;
  transition: 0.5;
  &:hover {
    transform: scale(1.2) translateZ(20px);
    z-index: 2;
    background-image: ${({ hoverimgurl }) =>
      `url(https://www.themoviedb.org/t/p/w600_and_h900_bestv2${hoverimgurl})`};
  }
`;

const Overlay = styled.section`
  width: 100%;
  height: 100%;
  background: rgba(42, 41, 41, 0.9);
  opacity: 0;
  transition: all 1s;
  color: white;
  font-weight: bold;
  overflow-wrap: break-word;
  padding: 25px 15px;
  &:hover {
    opacity: 1;
  }
`;

const Vote = styled.div`
  font-size: 10px;
  display: inline-block;
`;

const IsAdult = styled.p`
  background-color: ${(props) => props.bgcolor};
  width: ${(props) => props.width};
  text-align: center;
  border-radius: 5px;
`;
