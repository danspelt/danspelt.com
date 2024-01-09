import { createContext, useEffect, useState } from "react";

export const KeyListenerContext = createContext();

export const KeyListenerProvider = ({ children }) => {
  const [isAlt, setIsAlt] = useState(false);

  
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Alt") {
        setIsAlt(true);
      }
      else {
        setIsAlt(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <KeyListenerContext.Provider value={{
      isAlt,
      setIsAlt,
    }}>
      {children}
    </KeyListenerContext.Provider>
  );
};