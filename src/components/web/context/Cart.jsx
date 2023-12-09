import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useQuery } from "react-query";

const CartContext = createContext(null);
function CartContextProvider({ children }) {
  const [userToken, setUserInfoLocal] = useState(localStorage.getItem("userToken"));
  const [cartItems, setCartItems] = useState(null);
  const getCartItems = async (userToken = localStorage.getItem("userToken")) => {
    if (userToken != null) {
       const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setCartItems(data.products);
      return data.products;
    }
    return [];
  };
  const removeItemCart = async (productId) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/removeItem`,
      { productId },
      {
        headers: { Authorization: `Tariq__${userToken}` },
      }
    );
    getCartItems();
  };
  const actionsItemCart = async (productId, quantity) => {
    if (quantity > 0) {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Tariq__${localStorage.getItem("userToken")}` },
        }
      );
      getCartItems();
    } else {
      removeItemCart(productId);
    }
  };
  useEffect(() => {
    if (userToken) {
      getCartItems(userToken);
    }
  }, []);
  const setUserToken = (userToken) => {
    setUserInfoLocal(userToken);
    getCartItems(userToken);
  };
  return (
    <CartContext.Provider value={{ cartItems, actionsItemCart, setUserToken }}>
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartContextProvider };
