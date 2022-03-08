import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Notification as NotificationType } from '../contexts/NotificationContext';
import { css, keyframes } from '@emotion/react';

const Notification = ({ notification }: { notification: NotificationType }) => {
  const { type, message, dismissTime } = notification;

  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const notify = setTimeout(() => {
      setIsFading(true);
    }, dismissTime - 500);

    return () => {
      clearTimeout(notify);
    };
  }, [dismissTime]);

  return (
    <Container isFading={isFading} type={type}>
      {message}
    </Container>
  );
};

export default Notification;

const ToastIn = keyframes`
  from {
    transform: translateX(100%)
  } to {
    transform: translateX(0)
  }
`;

const Container = styled.div<{ type: string; isFading: boolean }>`
  transition: transform 0.6s ease-in-out;
  animation: ${ToastIn} 0.6s;
  background: ${(props) => (props.type === 'success' ? 'green' : 'red')};
  transition: 0.3s ease;

  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.6);
  color: #000;
  opacity: 0.9;
  font-weight: 600;

  height: 50px;
  min-width: 120px;
  color: #fff;
  padding: 15px;
  margin: 10px;

  ${(props) =>
    props.isFading &&
    css`
      opacity: 0;
      transform: opacity 2s;
    `}
`;
