import React, { useContext } from "react";
import { CartContext } from "../../../context/Cart";

function Home() {
  const { notifyCartContext, isLoading } = useContext(CartContext);
  return <div>Home</div>;
}

export default Home;
