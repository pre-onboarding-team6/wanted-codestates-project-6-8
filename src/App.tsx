import React, { useState } from 'react';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';
import { Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import List from './pages/List';
import styled from '@emotion/styled';

function App() {
  const [scrollLock, setScrollLock] = useState(false);

  return (
    <AppComponent scrollLock={scrollLock}>
      <Global styles={reset} />
      <Routes>
        <Route path="/" element={<Main setScrollLock={setScrollLock} />} />
        <Route path="/list" element={<List setScrollLock={setScrollLock} />} />
      </Routes>
    </AppComponent>
  );
}

export default App;

const AppComponent = styled.div<{ scrollLock: boolean }>`
  position: relative;
  width: 360px;
  height: 812px;
  margin: auto;
  border: 1px solid #ddd;
  overflow: ${({ scrollLock }) => (scrollLock ? 'hidden' : 'scroll')};
`;
