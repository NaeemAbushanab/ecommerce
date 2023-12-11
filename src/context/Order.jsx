import { createContext } from "react";
import { useQuery } from "react-query";

const OrderContext = createContext(null);
function OrderContextProvider({ children }) {
  const getOrder = () => {
    console.log("setOrder");
  };
  //   const orderData = useQuery("order")
  return <OrderContext.Provider value={{ getOrder }}>{children}</OrderContext.Provider>;
}
export { OrderContext, OrderContextProvider };
