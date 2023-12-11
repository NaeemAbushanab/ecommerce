import React, { Children } from "react";
import "./FloatingWindow.css";
function FloatingWindow({ children, isDisplay = true }) {
  return <>{isDisplay && <div className="floatingWindow">{children}</div>}</>;
}

export default FloatingWindow;
