import { createContext, useContext, useEffect, useState } from "react";
import api from "../../api/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const loadMe = async () => {
      if (!token) {
        setReady(true);
        return;
      }
      try {
        const res = await api.get("/auth/me");
        setUser(res.data);
      } catch (e) {
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setReady(true);
      }
    };
    loadMe();
  }, []);

  const login = (tokenValue, userValue) => {
    localStorage.setItem("token", tokenValue);
    setUser(userValue || null);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, ready, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
