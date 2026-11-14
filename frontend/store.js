import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/redux/userSlice";
import messengerReducer from "./src/redux/mesengerSlice";
import themeReducer from "./src/redux/themSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    messenger: messengerReducer,
    theme: themeReducer,
  },
});

export default store;
