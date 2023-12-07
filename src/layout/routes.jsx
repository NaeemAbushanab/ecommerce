import UserLayout from "./Layout.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Home from "../components/web/home/Home.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import HomeDashboard from "../components/dashboard/home/Home.jsx";
import CategoriesDashboard from "../components/dashboard/categories/Categories.jsx";
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/register/Register.jsx";
import Signin from "../components/web/signin/Signin.jsx";
import Products from "../components/web/products/Products.jsx";
import Product from "../components/web/products/Product.jsx";
import Cart from "../components/web/cart/Cart.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "signin", element: <Signin /> },
      { index: true, element: <Home /> },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "category/:catID",
        element: <Products />,
      },
      {
        path: "product/:proID",
        element: <Product />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "home", element: <HomeDashboard /> },
      {
        path: "categories",
        element: <CategoriesDashboard />,
      },
    ],
  },
  {
    path: "/*",
    element: <p>page not found</p>,
  },
]);
