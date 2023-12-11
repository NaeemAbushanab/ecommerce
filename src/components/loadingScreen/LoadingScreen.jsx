import React from "react";
import ReactLoading from "react-loading";
import "./LoadingScreen.css";
function LoadingScreen({ children, isLoading }) {
  if (isLoading) {
    return (
      <>
        <div className="loadingScreen">
          <i>
            <ReactLoading type="spin" width={50} height={50} color="black" className="m-auto" />
          </i>
        </div>
        {children}
      </>
    );
  }
  return children;
}

export default LoadingScreen;
