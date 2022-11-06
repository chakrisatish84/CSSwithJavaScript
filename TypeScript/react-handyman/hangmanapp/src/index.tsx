import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledApp } from './Components/App';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledApp />
  </React.StrictMode>
);
