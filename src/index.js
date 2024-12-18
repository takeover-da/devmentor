import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';
import { login } from './store/memberSlice';


export const Context = createContext();
let host = 'http://localhost:8080';

const userStr = localStorage.getItem('user');
const token = localStorage.getItem('token');
if (userStr !== null) {
  const user = JSON.parse(userStr);
  store.dispatch(login({ user: user, token: token }));
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Context.Provider value={{host}}>
        <Provider store={store}>
          <App />
        </Provider>
      </Context.Provider>
    </React.StrictMode>
  </BrowserRouter>

);