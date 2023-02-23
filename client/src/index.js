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

dotenv.config();

axios.defaults.baseURL = "http://localhost:3001";

//const domain = process.env.REACT_APP_DOMAIN;
//const clientId = process.env.REACT_APP_CLIENT_ID;

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-o258bcfpbouzrhk8.us.auth0.com"
    clientId="GkEi3xMNmKQpfAOqJusDtkIhH5WiIxSe"
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