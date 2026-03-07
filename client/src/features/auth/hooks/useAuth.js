import { useContext, useEffect } from "react";
import { AuthContext } from "./../auth.context";
import { getMe, login, logout, register } from "../services/auth.api";

export const useAuth = () => {
  const { user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ username, email, password }) => {
    const data = await register({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleLogin = async ({ username, email, password }) => {
    const data = await login({ username, email, password });
    setUser(data.user);
    setLoading(false);
  };

  const handleGetMe = async () => {
    const data = await getMe();
    setUser(data.user);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logout();
    setUser(null);
    setLoading(false);
  };

  useEffect(() => {
    handleGetMe();
  },[]);

  return {
    user,
    loading,
    handleRegister,
    handleLogin,
    handleGetMe,
    handleLogout,
  };
};
