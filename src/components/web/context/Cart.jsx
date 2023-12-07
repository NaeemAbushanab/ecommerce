import axios from "axios";
import { createContext } from "react";
import { useQuery } from "react-query";

const CartContext = createContext(null);
function CartContextProvider({ children }) {
  const userToken = localStorage.getItem("userToken");
  const getCartItems = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: { Authorization: `Tariq__${userToken}` },
    });
    return data.products;
  };
  const cartItems = useQuery("cartItems", getCartItems);
  const removeItemFromCart = async (productId) => {
    const { data } = await axios.patch(
      `${import.meta.env.VITE_API_URL}/cart/removeItem`,
      { productId },
      {
        headers: { Authorization: `Tariq__${userToken}` },
      }
    );
  };
  return (
    <CartContext.Provider value={{ cartItems, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
export { CartContext, CartContextProvider };
