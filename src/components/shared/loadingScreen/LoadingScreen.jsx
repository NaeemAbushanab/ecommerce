import React from "react";
import ReactLoading from "react-loading";

function LoadingScreen() {
  return (
    <ReactLoading
      type="spinningBubbles"
      color="#0d6efd"
      height={100}
      width={50}
      className="m-auto"
    />
  );
}

export default LoadingScreen;
