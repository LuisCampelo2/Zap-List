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

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, thunkAPI) => {
    const res = await thunkAPI.dispatch(getUser());

    if (getUser.fulfilled.match(res)) {
      return res.payload;
    }

    if (getUser.rejected.match(res)) {
      try {
        await axios.post(`${import.meta.env.VITE_API_URL}/api/refresh`, null, {
          withCredentials: true,
        });

        const retry = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/me`,
          {
            withCredentials: true,
          }
        );
        return retry.data;
      } catch (refreshError) {
        console.log(refreshError);
        return thunkAPI.rejectWithValue("Sessao expirada.Faça login novamente");
      }
    }

    return thunkAPI.rejectWithValue("Erro ao verificar autenticação");
  }
);

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

type UserState = {
  user: User | null;
  authenticated: boolean;
  error: string | null;
  loading: boolean;
};

const initialState: UserState = {
  user: null,
  authenticated: false,
  error: null,
  loading: false,
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
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state) => {
        state.loading = false;
        state.authenticated = true;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload as string;
        state.loading = false;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
