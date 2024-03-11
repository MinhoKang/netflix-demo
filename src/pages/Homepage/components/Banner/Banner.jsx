import React, { useState } from "react";
import { usePopularMoviesQuery } from "../../../../hooks/usePopularMovies";
import Alert from "react-bootstrap/Alert";
import styled from "styled-components";
import "./Banner.style.css";
import YouTube from "react-youtube";
import { useMovieVideoIdQuery } from "../../../../hooks/useMovieVideoId";
import { Button } from "react-bootstrap";
import MovieVideoModal from "../../../../common/MovieVideoModal/MovieVideoModal";

const Banner = () => {
  const { data, isLoading, isError, error } = usePopularMoviesQuery();
  const { data: movieVideo } = useMovieVideoIdQuery({
    id: data?.results[0]?.id,
  });
  console.log('데이ㅏ',data)
  console.log("asdsad", movieVideo);
  if (isLoading) {
    <h1>로딩중...</h1>;
  }
  if (isError) {
    <Alert variant="danger">{error.message}</Alert>;
  }
  const bannerVideo = movieVideo?.results?.filter(
    (video) => video?.type === "Clip"
  );
  const [showTrailer, setShowTrailer] = useState(false);

  return (
    <div
      style={{
        backgroundImage:
          "url(" +
          `https://www.themoviedb.org/t/p/w1066_and_h600_bestv2${data?.results[0]?.poster_path}` +
          ")",
      }}
      className="banner"
    >
      {/* <BannerContainer>
        {bannerVideo && (
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${bannerVideo?.[0]?.key}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        )}
      </BannerContainer> */}
      <div className="text-white banner-text-area">
        <h1>{data?.results[0]?.title}</h1>
        <p>{data?.results[0]?.overview}</p>
        <Button variant="danger" onClick={() => setShowTrailer(true)}>
          VIEW CLIP
        </Button>
      </div>
      {showTrailer && (
        <MovieVideoModal id={bannerVideo} setShowTrailer={setShowTrailer} />
      )}
    </div>
    // <BannerContainer backgroundimg={backgroundImage}>
    //   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis quod nisi explicabo ipsa
    //   doloribus neque quo ipsum sequi illum assumenda quos id tenetur quibusdam, voluptatibus ullam
    //   porro enim optio exercitationem.
    // </BannerContainer>
  );
};

export default Banner;

const BannerContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 65vh;
`;
