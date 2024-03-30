"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [userprofile, setUserProfile] = useState({});

  return (
    <ThemeContext.Provider
      value={{
        userprofile,
        setUserProfile,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useDataContext = () => useContext(ThemeContext);
