import React from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./layout/routes.jsx";
import { CartContextProvider } from "./context/Cart.jsx";
import { UserContextProvider } from "./context/User.jsx";

function App() {
  return (
    <CartContextProvider>
      <UserContextProvider>
        <RouterProvider router={router} />
      </UserContextProvider>
    </CartContextProvider>
  );
}

export default App;
