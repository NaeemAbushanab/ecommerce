import axios from "axios";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { CartContext } from "./Cart";

const UserContext = createContext(null);
function UserContextProvider({ children }) {
  const { setUserToken } = useContext(CartContext);
  const [userInfo, setUserInfoLocal] = useState(null);

  const setUserInfo = async (userToken) => {
    if (userToken == null) {
      setUserInfoLocal(null);
    } else {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setUserInfoLocal(data.user);
      setUserToken(userToken);
    }
  };
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserInfo(localStorage.getItem("userToken"));
    }
  }, []);
  return <UserContext.Provider value={{ setUserInfo, userInfo }}>{children}</UserContext.Provider>;
}
export { UserContext, UserContextProvider };
