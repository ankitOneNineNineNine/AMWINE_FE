import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {createLogger} from 'redux-logger'

import reportWebVitals from './reportWebVitals';
import { setProducts, setUser,setCart, setFilter } from './reduxMgmt/reducers/reducers';

const logger = createLogger();


const rootReducer = combineReducers({user: setUser, product:setProducts, cart:setCart, filter:setFilter})
const store = createStore(rootReducer, applyMiddleware(logger))


ReactDOM.render(
  <React.StrictMode>
    <Provider store = {store}>
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
