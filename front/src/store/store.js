import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
    user: userReducer, // slice reducer 추가
    auth: authReducer,
  },
});

export default store;
