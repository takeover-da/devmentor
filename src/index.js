import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createContext } from 'react';
import store from './store/store';
import { Provider } from 'react-redux';


const root = ReactDOM.createRoot(document.getElementById('root'));

// Context: 여러 컴포넌트에서 값을 관리할때 사용
export const Context = createContext();

// API 기본 주소
let host = 'http://localhost:8080';

root.render(

  <BrowserRouter>
    <React.StrictMode>
      {/* 하위 컴포넌트들에게 context 데이터 전달 */}
      <Context.Provider value={{host}}>
        <Provider store={store}>
          <App />
        </Provider>
      </Context.Provider>
    </React.StrictMode>
  </BrowserRouter>

);