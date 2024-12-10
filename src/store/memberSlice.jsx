import { createSlice } from "@reduxjs/toolkit";

// state 초기값 (인증토큰과 회원정보)
const initialState = {
  token: null,
  user: null
}

// 인자: {name: 작명, state 초기값, 리듀서함수{}}
export const memberSlice = createSlice(
  {
    name: "memberSlice",
    initialState,
    reducers: {
      login: (state, action) => {
        state.token = action.payload.token;
        state.user = action.payload.user;
      },
      logout: (state, action) => {
        state.token = null;
        state.user = null;
      }
    }
  }
);

// 
export const {login, logout} = memberSlice.actions;