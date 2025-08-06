import {createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { type Product } from "../types/product";

type Filters = {
  name: string;
  category: string;
};

export const fetchProducts = createAsyncThunk(
  "products/fetchPorducts",
  async ({
    filters,
    listId,
    page,
  }: {
    filters: Filters;
    listId: number;
    page: number;
  }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/products`,
        {
          params: {
            name: filters.name.trim() || undefined,
            category: filters.category || undefined,
            listId: listId || undefined,
            page,
            limit: 20,
          },
          withCredentials: true,
        }
      );
      return {
        products: res.data.products,
        totalPages: res.data.totalPages,
        productsInlist:res.data.productsInList,
      }
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      if (axios.isAxiosError(error)) {
        console.error("Axios error:", error.response?.data || error.message);
      }
    }
  }
);

interface ProductsState {
  products: Product[];
  productInList: number[];
  totalPages: number;
  page: number;
  limit: number;
  error: string | null;
  loading: boolean;
}

const initialState: ProductsState = {
  products: [],
  productInList:[],
  totalPages: 0,
  page: 1,
  limit:20,
  error: null,
  loading: false,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.products = action.payload?.products;
        state.totalPages = action.payload?.totalPages;
        state.productInList = action.payload?.productsInlist;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default productsSlice.reducer;