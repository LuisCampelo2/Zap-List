import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ShoppingList } from "../types/shoppingList";

export const fetchLists = createAsyncThunk("lists/fetchLists", async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/lists`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error("Erro desconhecido", err);
    }
  }
});

interface ListsState {
  lists: ShoppingList[];
  loading: boolean;
  error: string | null;
}

const initialState: ListsState = {
  lists: [],
  loading: false,
  error: null,
};

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    setLists: (state, action)=>{
      state.lists = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLists.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLists.fulfilled, (state, action) => {
        state.lists = action.payload;
        state.loading = false;
      })
      .addCase(fetchLists.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setLists } = listsSlice.actions;
export default listsSlice.reducer;
