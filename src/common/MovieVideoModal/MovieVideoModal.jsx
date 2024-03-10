import React from "react";
import { useMovieVideoIdQuery } from "../../hooks/useMovieVideoId";
import YouTube from "react-youtube";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const MovieVideoModal = ({ id, setShowTrailer }) => {
  const { data } = useMovieVideoIdQuery({ id });
  //   const trailer = data?.find((video) => video.type === 'Trailer');
  console.log(data);
  const filterTrailer = data?.results?.filter(
    (video) => video?.type === "Trailer" && video?.official === true
  );
  console.log(filterTrailer);

  const opts = {
    height: "600",
    width: "1000",
    // playerVars: {
    //   // https://developers.google.com/youtube/player_parameters
    // autoplay: 1,
    // },
  };
  return (
    <TrailerContainer onClick={() => setShowTrailer(false)}>
      <CloseBtn onClick={() => setShowTrailer(false)}>
        <FontAwesomeIcon icon={faTimes} />
      </CloseBtn>
      <Trailer>
        <YouTube videoId={filterTrailer?.[0]?.key} opts={opts} />
      </Trailer>
    </TrailerContainer>
  );
};

export default MovieVideoModal;

const TrailerContainer = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 100;
`;

const Trailer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 30px;
  color: white;
  cursor: pointer;
`;
