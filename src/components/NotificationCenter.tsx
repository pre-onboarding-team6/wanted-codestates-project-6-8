import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { NotificationContext } from '../contexts/NotificationContext';
import Notification from './Notification';

const NotificationCenter = () => {
  const { notifications } = useContext(NotificationContext);
  return (
    <Container>
      {notifications.map((noti, idx) => (
        <Notification key={idx} notification={noti} />
      ))}
    </Container>
  );
};

export default NotificationCenter;

const Container = styled.div`
  font-size: 1rem;
  position: fixed;
  z-index: 999999;
  top: 50px;
  right: 50px;
  overflow: hidden;
`;
