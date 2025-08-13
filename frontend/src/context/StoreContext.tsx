import { createContext, useState, ReactNode } from "react";

interface StoreContextType {
  token: string;
  setToken: (token: string) => void;
}

export const StoreContext = createContext<StoreContextType>({
  token: "",
  setToken: () => { },
});

interface StoreProviderProps {
  children: ReactNode;
}

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  return (
    <StoreContext.Provider value={{ token, setToken }}>
      {children}
    </StoreContext.Provider>
  );
};
