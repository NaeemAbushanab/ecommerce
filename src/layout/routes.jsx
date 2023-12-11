import { createBrowserRouter } from "react-router-dom";
import WebLayout from "./Layout.jsx";
import Categories from "../pages/web/categories/Categories.jsx";
import Product from "../pages/web/product/Product.jsx";
import Cart from "../pages/web/cart/Cart.jsx";
import Register from "../pages/auth/register/Register.jsx";
import Login from "../pages/auth/login/Login.jsx";
import Home from "../pages/web/home/Home.jsx";
import Profile from "../pages/web/profile/Profile.jsx";
import CategoryProducts from "../pages/web/categoryProducts/CategoryProducts.jsx";
import ForgotPassword from "../pages/auth/forgotPassword/ForgotPassword.jsx";
import SendCode from "../pages/auth/sendCode/SendCode.jsx";
import Order from "../pages/web/order/Order.jsx";
import { OrderContextProvider } from "../context/Order.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { index: true, element: <Home /> },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "CategoryProducts/:catID",
        element: <CategoryProducts />,
      },
      {
        path: "product/:proID",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "sendCode",
        element: <SendCode />,
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "order",
        element: (
          <OrderContextProvider>
            <Order />
          </OrderContextProvider>
        ),
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: <DashboardLayout />,
  //   children: [
  //     { path: "home", element: <HomeDashboard /> },
  //     {
  //       path: "categories",
  //       element: <Categories />,
  //     },
  //   ],
  // },
  {
    path: "/*",
    element: <p>page not found</p>,
  },
]);
