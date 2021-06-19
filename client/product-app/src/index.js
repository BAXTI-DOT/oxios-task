import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import { SnackbarProvider } from 'notistack'

ReactDOM.render(
    <SnackbarProvider maxSnack={3}>
      <App /> 
    </SnackbarProvider>,
  document.getElementById('root')
);
