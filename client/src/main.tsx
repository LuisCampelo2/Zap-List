import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { HomePage } from "./pages/home/home.tsx";
import { MyLists } from "./pages/myLists/myLists.tsx";
import { Products } from "./pages/products/products.tsx";
import { ShoppingListForm } from "./pages/create-list/createList.tsx";
import { SelectedList } from "./pages/selectedList/selectedList.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="/lists" element={<MyLists />} />
          <Route path="/lists/:id" element={<SelectedList />}/>
          <Route path="/createList" element={<ShoppingListForm/>}/>
          <Route path="/products" element={<Products />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </>
);
