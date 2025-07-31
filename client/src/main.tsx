import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { HomePage } from "./pages/home.tsx";
import { MyLists } from "./pages/myLists.tsx";
import { Products } from "./pages/products.tsx";
import { ShoppingListForm } from "./pages/createList.tsx";
import { SelectedList } from "./pages/selectedList.tsx";
import { PrivateRoute } from "./components/privateRoute.tsx";
import { LoginPage } from "./pages/loginPage.tsx";
import { RegisterPage } from "./pages/registerPage.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { AcctivateAccount } from "./pages/acctivateAccount.tsx";
import { ActivationAccount } from "./pages/acctivationAccount.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/activation" element={<ActivationAccount />} />
            <Route path="/activate/:token" element={<AcctivateAccount />} />
            <Route element={<PrivateRoute />}>
              <Route path="/lists" element={<MyLists />} />
              <Route path="/lists/:id" element={<SelectedList />} />
              <Route path="/createList" element={<ShoppingListForm />} />
              <Route path="/products" element={<Products />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </>
);
