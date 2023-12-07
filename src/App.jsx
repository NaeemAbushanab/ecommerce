import React, { useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { CartContextProvider } from "./components/web/context/Cart.jsx";
import { UserContextProvider } from "./components/web/context/User.jsx";
import { router } from "./layout/routes.jsx";
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
