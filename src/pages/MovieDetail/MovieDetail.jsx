import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovieIdQuery } from "../../hooks/useMovieId";
import styled from "styled-components";
import { useMovieGenreQuery } from "../../hooks/useMovieGenre";
import Badge from "react-bootstrap/Badge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";
import { useMovieReviewQuery } from "../../hooks/useMovieReview";
import MovieReview from "./MoiveReview/MovieReview";
import RelatedMovies from "./RelatedMovies/RelatedMovies";
import MovieVideoModal from "../../common/MovieVideoModal/MovieVideoModal";

const MovieDetail = () => {
  let { id } = useParams();

  const { data, isLoading, isError, error } = useMovieIdQuery({ id });
  const movieData = data?.data;
  const { data: genreData } = useMovieGenreQuery();
  const thisMovieGenre = movieData?.genres?.map((thisGenre) => thisGenre?.name);

  const { data: movieReview } = useMovieReviewQuery({ id });
  const movieReviewData = movieReview?.data.results;

  const [selected, setSelected] = useState("Review");
  const selectBtn = (event) => {
    const select = event.target.innerText;
    setSelected(select);
  };

  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div>
      <Container>
        <InnerContainer>
          <ImgContainer imgurl={movieData?.poster_path} />
          <div>
            <div>
              {thisMovieGenre?.map((genre, index) => (
                <Badge bg="danger" key={index} style={{ marginRight: "10px" }}>
                  {genre}
                </Badge>
              ))}
            </div>
            <MovieTitle>{movieData?.title}</MovieTitle>
            <div>{movieData?.tagline}</div>
            <MovieDetailContainer>
              <div>
                <Vote>VOTE</Vote>
                {movieData?.vote_average}
              </div>
              <div>
                <FontAwesomeIcon icon={faUsers} />
                {movieData?.popularity}
              </div>
              <div>
                {movieData?.adult ? (
                  <IsAdult bgcolor={"#AA2F3E"} width={"20px"}>
                    18
                  </IsAdult>
                ) : (
                  <IsAdult bgcolor={"#EDBE49"} width={"25px"}>
                    All
                  </IsAdult>
                )}
              </div>
            </MovieDetailContainer>
            <Overview>{movieData?.overview}</Overview>
            <AdditionalDetailContainer>
              <div>
                <Badge bg="danger" style={{ marginRight: "10px" }}>
                  Budget
                </Badge>
                ${movieData?.budget.toLocaleString("ko-KR")}
              </div>
              <div>
                <Badge bg="danger" style={{ marginRight: "10px" }}>
                  Revenue
                </Badge>
                ${movieData?.revenue.toLocaleString("ko-KR")}
              </div>
              <div>
                <Badge bg="danger" style={{ marginRight: "10px" }}>
                  Release Date
                </Badge>
                {movieData?.release_date}
              </div>
              <div>
                <Badge bg="danger" style={{ marginRight: "10px" }}>
                  Run Time
                </Badge>
                {movieData?.runtime}M
              </div>
            </AdditionalDetailContainer>
            <WatchTrailer onClick={() => setShowTrailer(true)}>
              Watch Trailer
            </WatchTrailer>
          </div>
        </InnerContainer>
        <ReviewAndRelated>
          <ul>
            <li
              onClick={(event) => selectBtn(event)}
              selected={selected}
              thisText="Review"
            >
              Review
            </li>
            <li
              onClick={(event) => selectBtn(event)}
              selected={selected}
              thisText="Related Movies"
            >
              Related Movies
            </li>
          </ul>
        </ReviewAndRelated>
        {selected === "Review" ? (
          <MovieReview movieReviewData={movieReviewData} />
        ) : (
          <RelatedMovies id={id} />
        )}
      </Container>
      {showTrailer && (
        <MovieVideoModal id={id} setShowTrailer={setShowTrailer} />
      )}
    </div>
  );
};

export default MovieDetail;
const Container = styled.div`
  width: 70%;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 70px 0px;
`;

const InnerContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
`;

const ImgContainer = styled.section`
  /* src: ${({ imgurl }) =>
    `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${imgurl})`};
  width: 100%;
  height: 100%; */
  background-image: ${({ imgurl }) =>
    `url(https://image.tmdb.org/t/p/w300_and_h450_bestv2${imgurl})`};
  min-width: 300px;
  height: 450px;
  margin-right: 50px;
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

const MovieDetailContainer = styled.div`
  display: flex;
  margin-top: 15px;
  div {
    margin-right: 10px;
  }
`;

const Overview = styled.div`
  border-top: 1px solid white;
  border-bottom: 1px solid white;
  padding: 15px 0;
`;
const AdditionalDetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 150px;
  margin-top: 15px;
`;

const MovieTitle = styled.h2`
  margin-top: 15px;
`;

const ReviewAndRelated = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
  ul {
    display: flex;
    li {
      list-style: none;
      margin-right: 15px;
      cursor: pointer;
      font-size: 20px;
      font-weight: 600;
      /* background-color: #aa2f3e; */

      /* background-color: ${(props) =>
        props.selected === props.thisText ? "#aa2f3e" : "#0000ff"}; */
      background-color: ${({ selected, thisText }) =>
        selected === thisText ? "#aa2f3e" : "#0000ff"};
      padding: 10px;
      border-radius: 15px;
      cursor: pointer;
      &:hover {
        background-color: #da4f5f;
      }
    }
  }
`;

const WatchTrailer = styled.div`
  position: absolute;
  right: 0;
  cursor: pointer;
  background-color: #aa2f3e;
  border-radius: 10px;
  padding: 3px 8px;
  font-size: 14px;
  &:hover {
    background-color: #da4f5f;
  }
`;
