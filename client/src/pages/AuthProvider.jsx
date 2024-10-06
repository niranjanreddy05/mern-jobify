import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState('hello user');
  return(
  <AuthContext.Provider value={{user, setUser}}>
    {children}
  </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext)
}