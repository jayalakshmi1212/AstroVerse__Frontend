import { configureStore } from '@reduxjs/toolkit';
import authReducer from "../Features/Authentication/Authslice";
import tutorReducer from "../Features/Authentication/TutorSlice";
import userReducer from "../Features/Authentication/UserSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    tutor:tutorReducer,
    user: userReducer,
  },
});

export default store;
