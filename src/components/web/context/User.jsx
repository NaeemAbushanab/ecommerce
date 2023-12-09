import axios from "axios";
import { useContext } from "react";
import { createContext, useEffect, useState } from "react";
import { CartContext } from "./Cart";

const UserContext = createContext(null);
function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);

  const getUserInfo = async (userToken = localStorage.getItem("userToken")) => {
    if (userToken != null) {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setUserInfo(data.user);
    } else {
      setUserInfo(null);
    }
  };
  const notifyUserContext = (userToken) => {
    getUserInfo(userToken);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, notifyUserContext }}>{children}</UserContext.Provider>
  );
}
export { UserContext, UserContextProvider };
