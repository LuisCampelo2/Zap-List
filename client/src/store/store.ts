import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../slices/userSlice';
import listsReducer from '../slices/listsSlice';
import listProductReducer from '../slices/listProductsSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    lists: listsReducer,
    listProduct:listProductReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;