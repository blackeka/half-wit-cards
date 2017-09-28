import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
 
document.addEventListener('DOMContentLoaded', function() {
  ReactDOM.render((
    <BrowserRouter basename="/#">
      <App />
    </BrowserRouter>
    ),
    document.getElementById('app')
  );
});
