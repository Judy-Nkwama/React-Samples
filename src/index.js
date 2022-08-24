import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import App from './socketIO/App';
import { BrowserRouter } from "react-router-dom";
import {Provider} from 'react-redux';
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";
import "./bcdemo/bc.css";

import BCApp from "./BCApp";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <BrowserRouter>
      <Provider store={store} >
        <App />
      </Provider>
    </BrowserRouter> */}
    {/* <App /> */}
    <BCApp />
  </React.StrictMode>
);

reportWebVitals();
