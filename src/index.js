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

let host;
if (window.location.hostname === "localhost") {
  host = 'http://localhost:8080';
} else {
  host = '/api';
}

// 리액트 앱이 다시 실행이 될때
// 브라우저에 있는 로그인데이터를 꺼내서 다시 로그인 처리
const userStr = localStorage.getItem('user');
const token = localStorage.getItem('token');
if (userStr !== null) {
  const user = JSON.parse(userStr);
  // 다시 로그인
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