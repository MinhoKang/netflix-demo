import React from 'react';
import Badge from 'react-bootstrap/Badge';
import './MovieCard.style.css';

const MovieCard = ({ movie }) => {
  return (
    <div
      style={{
        backgroundImage:
          'url(' + `https://www.themoviedb.org/t/p/w600_and_h900_bestv2${movie.poster_path}` + ')',
      }}
      className="movie-card"
    >
      <div className="overlay">
        <h1>{movie.title}</h1>
        {movie.genre_ids.map((genre, index) => (
          <Badge bg="success" key={index}>
            {genre}
          </Badge>
        ))}
      </div>
      <div>{movie.vote_average}</div>
      <div>{movie.popularity}</div>
      <div>{movie.adult ? 'over 18' : 'under 18'}</div>
    </div>
  );
};

export default MovieCard;
