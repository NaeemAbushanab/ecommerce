import React, { useContext } from "react";
import { CartContext } from "../../../context/Cart";
import { UserContext } from "../../../context/User";
import LoadingScreen from "../../../components/loadingScreen/LoadingScreen";

function Home() {
  const { isLoadingCart } = useContext(CartContext);
  const { isLoadingUser } = useContext(UserContext);
  if (!isLoadingUser && isLoadingCart) {
    return <LoadingScreen />;
  }

  return <div>Home</div>;
}

export default Home;
