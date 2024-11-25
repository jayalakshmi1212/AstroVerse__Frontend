import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../Features/Authentication/Authslice";
import tutorReducer from "../Features/Authentication/TutorSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tutor:tutorReducer
  },
});

export default store;
