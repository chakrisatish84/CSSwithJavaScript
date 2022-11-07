import React from 'react';
import ReactDOM from 'react-dom/client';
import { StyledApp } from './Components/App';
import './Components/i18n/config'


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <StyledApp />
  </React.StrictMode>
);
