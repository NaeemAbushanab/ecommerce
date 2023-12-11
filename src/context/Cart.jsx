import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import { ErrorToast, WarningToast } from "../components/toast/Toast";

const CartContext = createContext(null);
function CartContextProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [cartItems, setCartItems] = useState(null);
  const [isLoadingCart, setIsLoading] = useState(true);
  const getCartItems = async (userToken = localStorage.getItem("userToken")) => {
    try {
      if (userToken != null) {
        const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
          headers: { Authorization: `Tariq__${userToken}` },
        });
        setUserToken(userToken);
        setCartItems(data.products);
        setIsLoading(false);
      } else {
        setUserToken(null);
        setCartItems(null);
      }
    } catch (error) {
      setCartItems([]);
      setIsLoading(false);
      ErrorToast(error.response.data.message);
    }
  };
  const actionsItemCart = (productId = "", action) => {
    switch (action) {
      case "add":
        addProduct(productId);
        break;
      case "remove":
        removeProduct(productId);
        break;
      case "increase":
        incQuantity(productId);
        break;
      case "decrase":
        decQuantity(productId);
        break;
      case "clear":
        clear();
    }
  };
  const addProduct = async (productId) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/cart`,
        { productId },
        {
          headers: { Authorization: `Tariq__${userToken}` },
        }
      );
    } catch (error) {
      WarningToast(error.response.data.message);
    } finally {
      getCartItems();
    }
  };
  const removeProduct = async (productId) => {
    setIsLoading(true);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/removeItem`,
      { productId },
      {
        headers: { Authorization: `Tariq__${userToken}` },
      }
    );
    getCartItems();
  };
  const incQuantity = async (productId) => {
    setIsLoading(true);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/incraseQuantity`,
      { productId },
      {
        headers: { Authorization: `Tariq__${userToken}` },
      }
    );
    getCartItems();
  };
  const decQuantity = async (productId) => {
    setIsLoading(true);
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/decraseQuantity`,
      { productId },
      {
        headers: { Authorization: `Tariq__${userToken}` },
      }
    );
    getCartItems();
  };
  const clear = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.patch(
        `${import.meta.env.VITE_API_URL}/cart/clear`,
        {},
        {
          headers: { Authorization: `Tariq__${userToken}` },
        }
      );
    } catch (error) {
      WarningToast(error.response.data.message);
    }
    getCartItems();
  };
  const notifyCartContext = (userToken) => {
    setIsLoading(true);
    getCartItems(userToken);
  };
  useEffect(() => {
    getCartItems();
  }, []);
  return (
    <CartContext.Provider
      value={{
        cartItems,
        isLoadingCart,
        notifyCartContext,
        actionsItemCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartContextProvider };
