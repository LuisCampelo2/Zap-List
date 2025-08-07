import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { type ShoppingListProducts } from "../types/shoppingListProduct";
import { type Product } from "../types/product";

type Filters = {
  name: string;
  category: string;
};

export const fetchProductsList = createAsyncThunk(
  "listsProduct/fetchProducts",
  async (
    {
      id,
      filters,
      page,
    }: {
      id: number;
      filters: Filters;
      page: number;
    },
    thunkAPI
  ) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/list/${id}/productsList`,
        {
          params: {
            name: filters.name.trim() || undefined,
            category: filters.category || undefined,
            page,
            limit: 10,
          },
          withCredentials: true,
        }
      );
      console.log("Dados recebidos:", res.data);
      return  {
        products: res.data.products,
        totalPages: res.data.totalPages,
        currentPage: res.data.currentPage,
        updatedList: res.data.updatedList,
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
  totalPages: number;
  page: number;
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
    productId: 0,
    observation: null,
    photo: "",
    totalPrice:0,
    Product: {
      id: 0,
      name: "",
      photo: "",
      category: "",
      quantity: 0,
      isChecked: false,
      observation: "",
      price: 0,
      unitOFMeasure: 0,
    },
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
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProductsList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsList.fulfilled, (state, action) => {
        state.products = action.payload.products;
        state.totalPages = action.payload.totalPages;
        state.list = action.payload.updatedList;
        state.page = action.payload.currentPage;
        state.loading = false;
      })
      .addCase(fetchProductsList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
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

export const { setPage,setProducts } = listProductSlice.actions;
export default listProductSlice.reducer;
