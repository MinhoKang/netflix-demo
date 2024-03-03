import React, { useState } from 'react';
import styled from 'styled-components';

const ReviewText = ({ review }) => {
  const [showAll, setShowAll] = useState(false);
  const showText = () => {
    setShowAll(!showAll);
  };
  return (
    <div>
      <Review showAll={showAll}>{review.content}</Review>
      <BtnBox>
        <ShowMoreBtn onClick={showText}>{showAll ? '줄이기' : '더보기'}</ShowMoreBtn>
      </BtnBox>
    </div>
  );
};

export default ReviewText;

const Review = styled.p`
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => (props.showAll ? 'unset' : '3')};
  -webkit-box-orient: vertical;
  word-break: keep-all;
`;

const BtnBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
`;

const ShowMoreBtn = styled.button`
  cursor: pointer;
  font-size: 14px;
  background-color: transparent;
  color: white;
  border: none;
`;
