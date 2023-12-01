import UserLayout from "./Layout.jsx";
import DashboardLayout from "./DashboardLayout.jsx";
import Home from "../components/web/home/Home.jsx";
import Categories from "../components/web/categories/Categories.jsx";
import HomeDashboard from "../components/dashboard/home/Home.jsx";
import CategoriesDashboard from "../components/dashboard/categories/Categories.jsx";
import { createBrowserRouter } from "react-router-dom";
import Register from "../components/web/register/Register.jsx";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <UserLayout />,
    children: [
      { path: "register", element: <Register /> },
      { path: "home", element: <Home /> },
      {
        path: "categories",
        element: <Categories />,
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
