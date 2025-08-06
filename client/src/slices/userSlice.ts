import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type User } from "../types/user";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
      withCredentials: true,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const login = createAsyncThunk(
  "user/login",
  async (
    { email, password }: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/login`,
        { email, password },
        {
          withCredentials: true,
        }
      );
      await thunkAPI.dispatch(getUser());
    } catch (error) {
      console.log(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response.data.message || "Erro no servidor."
          );
        } else if (error.request) {
          return thunkAPI.rejectWithValue(
            "Servidor não respondeu. Tente novamente."
          );
        } else {
          return thunkAPI.rejectWithValue("Erro inesperado. Tente novamente.");
        }
      } else {
        return thunkAPI.rejectWithValue("Erro desconhecido.");
      }
    }
  }
);

type UserState = {
  user: User | null;
  error: string | null;
  loading:boolean
};

const initialState: UserState = {
  user: null,
  error: null,
  loading:false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUser: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
    .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
