import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { WarningToast } from "../components/toast/Toast";

function ProtectedRoute({ children, auth }) {
  let location = useLocation();
  if (auth) {
    if (localStorage.getItem("userToken") == null) {
      WarningToast(
        <p className="fw-bold p-0 m-0">
          can't navigate to{" "}
          <span style={{ textDecoration: "underline" }}>{location.pathname.slice(1)}</span> page,
          you can login and then navigate to {location.pathname.slice(1)} page
        </p>
      );
      return <Navigate to={"/login"} replace />;
    }
    return children;
  } else {
    if (localStorage.getItem("userToken") != null) {
      WarningToast(
        <p className="fw-bold p-0 m-0">
          can't navigate to{" "}
          <span style={{ textDecoration: "underline" }}>{location.pathname.slice(1)}</span>, you can
          logout and then go to {location.pathname.slice(1)} page
        </p>
      );
      return <Navigate to={"/"} replace />;
    }
    return children;
  }
}

export default ProtectedRoute;
