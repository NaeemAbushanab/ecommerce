import React from "react";
import { toast } from "react-toastify";

const SuccessToast = (title) => {
  return 
};

const ErrorToast = (title) => {
  return toast.error(title, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
const WarningToast = (title) => {
  return toast.warn(title, {
    position: "top-right",
    autoClose: false,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  });
};
export { SuccessToast, ErrorToast, WarningToast };
