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
      state.token = action.payload.token;
      state.info = action.payload.user;
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