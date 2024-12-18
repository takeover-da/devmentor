import { createSlice } from "@reduxjs/toolkit";

// 회원 정보를 관리하는 슬라이스

const initialState = {
  token: null, // 인증 토큰
  info: null // 회원 정보
};

export const memberSlice = createSlice({
  name: "memberSlice",
  initialState,
  reducers: {
    login: (state, action) => {
      // 로그인 데이터를 state 상태와 브라우저 스토리지 저장
      state.token = action.payload.token;
      state.info = action.payload.user;
      // 브라우저 꺼지면 state 상태 초기화
      // 로그인 상태 유지
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.info = null;
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
  },
});

export const { login, logout } = memberSlice.actions;