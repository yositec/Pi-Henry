import React from 'react';
import ReactDOM from 'react-dom';
import axios from "axios";
import dotenv from "dotenv";

import './index.css';
import App from './App';

import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/store";
import { Auth0Provider } from "@auth0/auth0-react";

//dotenv.config();

//axios.defaults.baseURL = "http://localhost:3001";
axios.defaults.baseURL = "https://pi-henry-production-b8c4.up.railway.app";

const fs = require('fs');
const path = require('path');
const os = require('os');

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain= {process.env.REACT_APP_DOMAIN}
    clientId={process.env.REACT_APP_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}>
    <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      </Auth0Provider>
  </React.StrictMode>,
  document.getElementById('root')
);