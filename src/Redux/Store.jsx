import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../Features/Authentication/Authslice";
 

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
