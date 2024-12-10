import { configureStore } from "@reduxjs/toolkit";
import { memberSlice } from "./memberSlice";

// store: 슬라이스들이 모여있는 곳
const store = configureStore({
  reducer: {
    member: memberSlice.reducer
  }
});

export default store;