import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ShoppingListProducts } from "../types/shoppingListProduct";
import { type Product } from "../types/product";

export const addProductToList = createAsyncThunk(
  "listsProduct/addProduct",
  async ({
    listIdParams,
    selectedShoppingListId,
    productId,
    quantity,
    observation,
  }: {
    listIdParams?: number;
    selectedShoppingListId?: number;
    productId: number | null;
    quantity: number | null;
    observation: string | null;
    }) => {
    const shoppingListId = listIdParams || selectedShoppingListId;

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shopping-list-add-product`,
        {
          shoppingListId,
          productId,
          quantity,
          observation,
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteProductInList = createAsyncThunk(
  "products/deleteProduct",
  async (
    {
      shoppingProductId,
    }: {
      shoppingProductId: number;
    },
    thunkAPI
  ) => {
    try {
      await axios.delete(
        `${
          import.meta.env.VITE_API_URL
        }/api/product-list-delete/${shoppingProductId}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error(error);
      if (axios.isAxiosError(error)) {
        if (error.response) {
          return thunkAPI.rejectWithValue(
            error.response?.data.message || "Erro ao deletar produto:"
          );
        }
      }
    }
  }
);

interface ListProductsState {
  list: ShoppingListProducts;
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ListProductsState = {
  list: {
    id: 0,
    name: "",
    quantity: null,
    isChecked: false,
    shoppingListId: 0,
    productId:0,
    observation: null,
    photo: "",
  },
  products: [],
  loading: false,
  error: null,
};

const listProductSlice = createSlice({
  name: "listProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
          .addCase(addProductToList.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addProductToList.fulfilled, (state) => {
            state.loading = false;
          })
          .addCase(addProductToList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          })
     .addCase(deleteProductInList.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(deleteProductInList.fulfilled, (state) => {
            state.loading = false;
          })
          .addCase(deleteProductInList.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
          });
      },
})

export default listProductSlice.reducer;
