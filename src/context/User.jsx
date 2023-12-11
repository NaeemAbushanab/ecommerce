import axios from "axios";
import { createContext, useEffect, useState } from "react";

const UserContext = createContext(null);
function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  const [isLoadingUser, setIsLoading] = useState(true);
  const getUserInfo = async (userToken = localStorage.getItem("userToken")) => {
    if (userToken != null) {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/user/profile`, {
        headers: { Authorization: `Tariq__${userToken}` },
      });
      setIsLoading(false);
      setUserInfo(data.user);
    } else {
      setUserInfo(null);
      setIsLoading(true);
    }
  };
  const notifyUserContext = (userToken) => {
    setIsLoading(true);
    getUserInfo(userToken);
  };
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <UserContext.Provider value={{ userInfo, notifyUserContext, isLoadingUser }}>
      {children}
    </UserContext.Provider>
  );
}
export { UserContext, UserContextProvider };
