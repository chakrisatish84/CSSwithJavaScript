import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledAppComp } from './App';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledAppComp />
  </React.StrictMode>
);
