import React, { useState } from "react";
import Alert from "react-bootstrap/Alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useSearchMovieQuery } from "../../hooks/useSearchMovie";
import ClipLoader from "react-spinners/ClipLoader";
import { Col, Container, Row } from "react-bootstrap";
import MovieCard from "../../common/MovieCard/MovieCard";
import ReactPaginate from "react-paginate";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useMovieGenreListQuery } from "../../hooks/useMovieGenreList";

const MoviePage = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get("q");
  const { data, isLoading, isError, error } = useSearchMovieQuery({
    keyword,
    page,
  });

  const { data: genreData } = useMovieGenreListQuery();
  const genreList = genreData?.data.genres;
  const [filter1, setFilter1] = useState("정렬 기준");
  const [filter2, setFilter2] = useState("장르별 검색");
  console.log("검색된 데이터", data);
  console.log("장르 데이터", genreList);

  const [popularity, setPopularity] = useState("");
  console.log(popularity);
  const [genre, setGenre] = useState("");

  const handleMovieDetailPage = (movie) => {
    // navigate();
    console.log(movie);
    navigate(`/movies/${movie.id}`);
  };

  const handleFilter1 = (event) => {
    setFilter1(event.target.innerText);
    setPopularity(
      event.target.innerText === "인기 많은 순"
        ? "popularity.desc"
        : "popularity.asc"
    );
  };
  const handleFilter2 = (event) => {
    setFilter2(event.target.innerText);
    setGenre(event.target.innerText);
  };

  const handlePageClick = ({ selected }) => {
    setPage(selected + 1);
  };

  if (isLoading) {
    return (
      <ClipLoader
        color="red"
        loading={true}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    );
  }
  if (isError) {
    return <Alert variant="danger">{error.message}</Alert>;
  }
  const filteredMovies = genre
    ? data.results.filter((movie) =>
        movie.genre_ids.includes(genreList.find((g) => g.name === genre)?.id)
      )
    : data.results;
  const sortedMovies = filteredMovies.slice().sort((a, b) => {
    if (popularity === "popularity.desc") {
      return b.popularity - a.popularity; // 내림차순 정렬
    } else if (popularity === "popularity.asc") {
      return a.popularity - b.popularity; // 오름차순 정렬
    } else {
      return 0; // 정렬 기준이 없는 경우 그대로 유지
    }
  });
  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            <DropdownButton
              variant="danger"
              id="dropdown-basic-button"
              title={filter1}
            >
              <Dropdown.Item onClick={handleFilter1}>
                인기 많은 순
              </Dropdown.Item>
              <Dropdown.Item onClick={handleFilter1}>
                인기 적은 순
              </Dropdown.Item>
            </DropdownButton>
            <DropdownButton
              variant="danger"
              id="dropdown-basic-button"
              title={filter2}
            >
              {genreList?.map((genre, index) => (
                <Dropdown.Item key={index} onClick={handleFilter2}>
                  {genre.name}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {/* {!popularity
                ? data?.results?.map((movie, index) => (
                    <Col key={index} lg={4} xs={12}>
                      <div onClick={() => handleMovieDetailPage(movie)}>
                        <MovieCard movie={movie} />
                      </div>
                    </Col>
                  ))
                : pop?.results?.map((movie, index) => (
                    <Col key={index} lg={4} xs={12}>
                      <div onClick={() => handleMovieDetailPage(movie)}>
                        <MovieCard movie={movie} />
                      </div>
                    </Col>
                  ))} */}
              {/* {pop?.results?.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <div onClick={() => handleMovieDetailPage(movie)}>
                    <MovieCard movie={movie} />
                  </div>
                </Col>
              ))} */}
              {sortedMovies.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <div onClick={() => handleMovieDetailPage(movie)}>
                    <MovieCard movie={movie} />
                  </div>
                </Col>
              ))}
            </Row>
            <ReactPaginate
              nextLabel="next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={data?.total_pages}
              previousLabel="< previous"
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
              forcePage={page - 1}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default MoviePage;
