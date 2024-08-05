import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Use this when developing
ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

// Use this when deploying
// Find all widget divs
const widgetDivs = document.querySelectorAll('.agent-artificial-chat-widget');

// Inject our React App into each class
widgetDivs.forEach(div => {
    ReactDOM.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
        div
    );
});