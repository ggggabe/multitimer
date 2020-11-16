import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      flexFlow: 'column'
    }}>
    <App />
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);
