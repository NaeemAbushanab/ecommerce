import axios from "axios";
import { createContext, useState } from "react";
import { useQuery } from "react-query";

const OrderContext = createContext(null);
function OrderContextProvider({ children }) {
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
        headers: { Authorization: `Tariq__${localStorage.getItem("userToken")}` },
      });
      return data.orders
    } catch (error) {
      console.log(error);
    }
  };
  const { data, isLoading } = useQuery("orders", getOrders);
  return <OrderContext.Provider value={{ data, isLoading }}>{children}</OrderContext.Provider>;
}
export { OrderContext, OrderContextProvider };
