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
import AccountDetails from "../pages/web/accountDetails/AccountDetails.jsx";
import Orders from "../pages/web/orders/Orders.jsx";
import Products from "../pages/web/products/Products.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <WebLayout />,
    children: [
      {
        path: "register",
        element: (
          <ProtectedRoute auth={false}>
            <Register />
          </ProtectedRoute>
        ),
      },
      {
        path: "login",
        element: (
          <ProtectedRoute auth={false}>
            <Login />
          </ProtectedRoute>
        ),
      },
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
        element: (
          <OrderContextProvider>
            <Product />
          </OrderContextProvider>
        ),
      },
      {
        path: "cart",
        element: (
          <ProtectedRoute auth={true}>
            <Cart />
          </ProtectedRoute>
        ),
      },
      {
        path: "sendCode",
        element: (
          <ProtectedRoute auth={false}>
            <SendCode />
          </ProtectedRoute>
        ),
      },
      {
        path: "forgotPassword",
        element: <ForgotPassword />,
      },
      {
        path: "profile",
        element: (
          <ProtectedRoute auth={true}>
            <OrderContextProvider>
              <Profile />
            </OrderContextProvider>
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <AccountDetails />,
          },
          {
            path: "orders",
            element: <Orders />,
          },
        ],
      },
      {
        path: "order",
        element: (
          <ProtectedRoute auth={true}>
            <OrderContextProvider>
              <Order />
            </OrderContextProvider>
          </ProtectedRoute>
        ),
      },
      {
        path: "products",
        element: <Products />,
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
