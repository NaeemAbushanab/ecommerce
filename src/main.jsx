import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./index.css";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <ToastContainer />
    <App />
  </>
);
