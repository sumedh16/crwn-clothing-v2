import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/user.context";
import { CartProvider } from "./context/cart.context";
import { CategoriesContextProvider } from "./context/categories.context";

const rootElement = document.getElementById("root");

render(
  <React.StrictMode>
    <BrowserRouter>
      <CategoriesContextProvider>
        <UserProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </UserProvider>
      </CategoriesContextProvider>
    </BrowserRouter>
  </React.StrictMode>,
  rootElement
);
