import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ShoppingListProducts } from "../types/shoppingListProduct";
import { type ShoppingList } from "../types/shoppingList";


export const fetchProductsList = createAsyncThunk(
  "listsProduct/fetchProducts",
  async (
    {
      id,
    }: {
      id: number;
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/list/${id}/productsList`,
        {
          withCredentials: true,
        }
      );
      console.log("Dados recebidos:", res.data);
      return {
        products: res.data.products,
        list:res.data.list,
      };
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(
        "Erro! Não foi possivel buscar produtos da lista"
      );
    }
  }
);

export const addProductToList = createAsyncThunk(
  "listsProduct/addProduct",
  async ({
    listId,
    productId,
    quantity,
    observation,
  }: {
    listId: number;
    productId: number | null;
    quantity: number | null;
    observation: string | null;
    }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/shopping-list-add-product`,
        {
          shoppingListId:listId,
          productId,
          quantity,
          observation,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error);
      throw error;
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

export const checkBoxChange = createAsyncThunk(
  "listProduct/checkbox",
  async (
    {
      id,
      isChecked,
    }: {
      id: number;
      isChecked: boolean;
    },
    thunkAPI
  ) => {
    const newIsChecked = !isChecked;

    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/checked/${id}`,
        { isChecked: newIsChecked },
        { withCredentials: true }
      );
      return {
        id,
        isChecked: newIsChecked,
      };
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue("Erro");
    }
  }
);

interface ListProductsState {
  list: ShoppingList;
  products: ShoppingListProducts[];
  totalPages: number;
  page: number;
  loading: boolean;
  error: string | null;
}

const initialState: ListProductsState = {
  list: {
    id: 0,
    name: "",
    totalPrice: 0,
  },
  products: [],
  loading: false,
  error: null,
  page: 1,
  totalPages: 0,
};

const listProductSlice = createSlice({
  name: "listProducts",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.list = action.payload.list;
        state.loading = false;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(checkBoxChange.pending, (state, action) => {
        const { id, isChecked } = action.meta.arg;
        const index = state.products.findIndex((p) => p.id === id);
        if (index !== -1) {
          state.products[index].isChecked = !isChecked;
        }
      })
      .addCase(checkBoxChange.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id
            ? { ...product, isChecked: updatedProduct.isChecked }
            : product
        );
      })
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
});

export const { setPage, setProducts } = listProductSlice.actions;
export default listProductSlice.reducer;
