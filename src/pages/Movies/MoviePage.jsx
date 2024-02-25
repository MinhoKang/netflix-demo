import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useSearchParams } from 'react-router-dom';
import { useSearchMovieQuery } from '../../hooks/useSearchMovie';
import ClipLoader from 'react-spinners/ClipLoader';
import { Col, Container, Row } from 'react-bootstrap';
import MovieCard from '../../common/MovieCard/MovieCard';
import ReactPaginate from 'react-paginate';

const MoviePage = () => {
  const [query, setQuery] = useSearchParams();
  const [page, setPage] = useState(1);
  const keyword = query.get('q');
  const { data, isLoading, isError, error } = useSearchMovieQuery({ keyword, page });
  const handlePageClick = ({ selected }) => {
    console.log('page', page);
    setPage(selected + 1);
    console.log(selected);
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
  return (
    <div>
      <Container>
        <Row>
          <Col lg={4} xs={12}>
            필터
          </Col>
          <Col lg={8} xs={12}>
            <Row>
              {data?.results.map((movie, index) => (
                <Col key={index} lg={4} xs={12}>
                  <MovieCard movie={movie} />
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
