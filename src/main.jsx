import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from "react-router-dom";

import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.js'
// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from "./Store/slices/authSlice.js";
import { Provider } from 'react-redux';
import { store } from './Store/index.js';


// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
    <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
)
