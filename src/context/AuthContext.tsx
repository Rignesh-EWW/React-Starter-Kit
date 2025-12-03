import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  userEmail: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const storedSession = localStorage.getItem("admin-session");
    if (storedSession) {
      const parsed = JSON.parse(storedSession) as { email: string };
      setIsAuthenticated(true);
      setUserEmail(parsed.email);
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    // Mock authentication. Replace with API-backed login in production.
    const isValid = email === "admin@example.com" && password === "admin123";
    if (isValid) {
      setIsAuthenticated(true);
      setUserEmail(email);
      localStorage.setItem("admin-session", JSON.stringify({ email }));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setUserEmail(null);
    localStorage.removeItem("admin-session");
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
