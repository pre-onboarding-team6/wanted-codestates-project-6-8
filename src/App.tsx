import React from 'react';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';
import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import List from './pages/List';
import styled from '@emotion/styled';

function App() {
  return (
    <AppComponent>
      <Global styles={reset} />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/list" element={<List />} />
        </Routes>
    </AppComponent>
  );
}

export default App;

const AppComponent = styled.div`
  width: 360px;
  height: 812px;
  margin: auto;
  border: 1px solid #ddd;
  overflow: scroll;
`
