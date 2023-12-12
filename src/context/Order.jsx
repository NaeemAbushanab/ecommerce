import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { ErrorToast } from "../components/toast/Toast";

const OrderContext = createContext(null);
function OrderContextProvider({ children }) {
  const [ordersData, setOrdersData] = useState(null);
  const [isLoadingOrders, setIsLoadingOrder] = useState(true);
  const getOrders = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/order`, {
        headers: { Authorization: `Tariq__${localStorage.getItem("userToken")}` },
      });
      setOrdersData(data.orders);
    } catch (error) {
      ErrorToast(error.response.data.message);
    } finally {
      setIsLoadingOrder(false);
    }
  };
  const notifyOrderContext = () => {
    setIsLoadingOrder(true);
    getOrders();
  };
  useEffect(() => {
    getOrders();
  }, []);
  const { data, isLoading } = useQuery("orders", getOrders);
  return (
    <OrderContext.Provider value={{ ordersData, notifyOrderContext, isLoadingOrders }}>
      {children}
    </OrderContext.Provider>
  );
}
export { OrderContext, OrderContextProvider };
