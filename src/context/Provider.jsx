import { useState } from "react";
import UserContext from "./Context";
import { saveUser, loadUser, removeUser } from "../storage";

function Provider({ children }) {
  // load user from localStorage
  const storageUser = loadUser();
  const [user, setUser] = useState(storageUser);

  const login = (userData) => {
    saveUser(userData);
    setUser(userData);
  };

  const logout = () => {
    removeUser();
    setUser({ email: null, accessToken: null });
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
}

export default Provider;
