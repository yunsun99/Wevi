import { useRecoilState } from "recoil";
import { authAtom } from "@/atoms/authAtom";
import { login, logout } from "@/api/auth";

export function useAuth() {
  const [authState, setAuthState] = useRecoilState(authAtom);

  const handleLogin = async (username, password) => {
    try {
      await login(username, password);
      setAuthState({ user: { username }, isAuthenticated: true });
    } catch (error) {
      console.error("로그인 실패:", error);
    }
  };

  const handleLogout = () => {
    logout();
    setAuthState({ user: null, isAuthenticated: false });
  };

  return { authState, handleLogin, handleLogout };
}
