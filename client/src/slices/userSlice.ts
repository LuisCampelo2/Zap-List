import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { type User } from "../types/user";
import axios from "axios";

export const getUser = createAsyncThunk("user/getUser", async (_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
      withCredentials: true,
    });
      return res.data;
  } catch (error) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      try {
        await thunkAPI.dispatch(refresh()).unwrap();
        const retry = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
          withCredentials: true,
        });
        return retry.data;
      } catch (refreshError) {
        console.log(refreshError);
        return thunkAPI.rejectWithValue("Sessão expirada. Faça login novamente.");
      }
    }
  }
});

export const refresh = createAsyncThunk("user/refresh", async (_, thunkAPI) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/refresh`, null, {
      withCredentials: true,
    });
    return res;
  } catch (error) {
    console.log(error);
    return thunkAPI.rejectWithValue("Sessao expirada");
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
      const res = await thunkAPI.dispatch(getUser());
      return res.payload;
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
export const logout = createAsyncThunk("user/logout", async () => {
  try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/logout`, null, {
    withCredentials: true,
  });
  } catch (error) {
    console.log(error);
  }
})

export const register = createAsyncThunk(
  "user/register",
  async (
    {
      email,
      password,
      name,
      lastName,
    }: {
      email: string;
      password: string;
      name: string;
      lastName: string;
    },
    thunkAPI
  ) => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/register`, {
        email,
        password,
        name,
        lastName,
      });

      await thunkAPI.dispatch(getUser());
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro no servidor:"
          );
        }
      }
    }
  }
);

export const activate = createAsyncThunk(
  "user/activate",
  async (
    {
      token,
    }: {
      token: string | undefined;
    },
    thunkAPI
  ) => {
    try {
      await axios.get(
        `${import.meta.env.VITE_API_URL}/api/activation/${token}`
      );
    } catch (error) {
      console.error("Erro na ativação:", error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro no servidor:"
          );
        }
      }
    }
  }
);

interface UserState {
  user: User | null;
  authenticated: boolean | null;
  error: string | null;
  loading: boolean;
};

const initialState: UserState = {
  user: null,
  authenticated: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.authenticated = true;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
        state.user = null;
        state.authenticated = false;
      })
      .addCase(refresh.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refresh.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(refresh.rejected, (state,action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = false;
        state.user = null;
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      })
  },
});


export default userSlice.reducer;
