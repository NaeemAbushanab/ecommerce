import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

const UserContext = createContext(null);
function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState(null);
  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserInfo(localStorage.getItem("userToken"));
    }
  }, []);
  return <UserContext.Provider value={{ setUserInfo, userInfo }}>{children}</UserContext.Provider>;
}
export { UserContext, UserContextProvider };
