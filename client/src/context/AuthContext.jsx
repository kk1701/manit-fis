import { createContext, useContext, useState } from "react";
import { api } from "../api/http";

const AuthContext = createContext();
export function useAuth() { return useContext(AuthContext); }

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token"));

  const login = async (email, password) => {
    const res = await api("/auth/login", { method: "POST", body: { email, password } });

    if(res.accessToken){
      localStorage.setItem("token", res.accessToken);
      setToken(res.accessToken);
    }
    return res;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
