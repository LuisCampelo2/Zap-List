import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import listsReducer from '../slices/listsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    lists:listsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;