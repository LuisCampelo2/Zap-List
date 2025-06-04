import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.tsx";
import { HomePage } from "./pages/home/home.tsx";
import { MyLists } from "./pages/myLists/myLists.tsx";
import { Products } from "./pages/products/products.tsx";
import { ShoppingListForm } from "./pages/create-list/createList.tsx";
import { SelectedList } from "./pages/selectedList/selectedList.tsx";
import { PrivateRoute } from "./components/privateRoute.tsx";
import { LoginPage } from "./pages/login/loginPage.tsx";
import { RegisterPage } from "./pages/register/registerPage.tsx";
import { store } from "./store/store.ts";
import { Provider } from "react-redux";
import { AcctivateAccount } from "./pages/acctivateAccount/acctivateAccount.tsx";
import { ActivationAccount } from "./pages/acctivationAccount/acctivationAccount.tsx";

createRoot(document.getElementById("root")!).render(
  <>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/activation" element={<ActivationAccount/>}/>
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
