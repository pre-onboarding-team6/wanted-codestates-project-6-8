import React from 'react';
import { Global } from '@emotion/react';
import { reset } from './styles/reset';

function App() {
  return (
    <div>
      <Global styles={reset} />
      {/* 컴포넌트 */}
    </div>
  );
}

export default App;
