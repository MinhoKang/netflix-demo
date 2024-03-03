import { faCaretDown, faCaretUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import ReviewText from './ReviewText';

const MovieReview = ({ movieReviewData }) => {
  const [showAllReviews, setShowAllReviews] = useState(false);

  const reviewsToShow = showAllReviews ? movieReviewData : movieReviewData?.slice(0, 3);

  const handleLoadMore = () => {
    setShowAllReviews(!showAllReviews);
  };

  return (
    <ReviewContainer>
      {reviewsToShow?.map((review, index) => (
        <ReviewContent key={index}>
          <Author>{review.author}</Author>

          {/* <ReviewText>{review.content}</ReviewText> */}
          <ReviewText review={review} />
        </ReviewContent>
      ))}
      <ShowAll onClick={handleLoadMore}>
        {showAllReviews ? 'Show Less' : 'Show All'}
        {showAllReviews ? (
          <FontAwesomeIcon icon={faCaretUp} />
        ) : (
          <FontAwesomeIcon icon={faCaretDown} />
        )}
      </ShowAll>
    </ReviewContainer>
  );
};

export default MovieReview;

const ReviewContainer = styled.div`
  position: relative;
  margin-top: 15px;
`;

const ReviewContent = styled.div`
  border: 1px solid red;
  padding: 20px;
  border-radius: 15px;
  margin-bottom: 15px;
`;

const ShowAll = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;
  font-size: 20px;
`;

const Author = styled.h4`
  font-weight: 600;
`;
