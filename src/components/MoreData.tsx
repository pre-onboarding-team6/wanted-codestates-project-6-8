import React from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';

const MoreData = () => {
  return (
    <Container>
      <Link to="/list">
        <MoreButton type="button">휴양림 데이터 가져오기</MoreButton>
      </Link>
    </Container>
  );
};

export default MoreData;

const Container = styled.div``;

const MoreButton = styled.button``;
