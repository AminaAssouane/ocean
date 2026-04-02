import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    api
      .get("/users")
      .then((res) => setCurrentUser(res.data))
      .catch(() => {});
  }, []);

  return (
    <UserContext.Provider value={{ currentUser }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
