"use client";

import { createContext, useContext, useState } from "react";

const ThemeContext = createContext({});

export const ContextProvider = ({ children }) => {
  const [userprofile, setUserProfile] = useState({});
  const [facultyLists, setFacultyLists] = useState({
    count: 0,
    faculty: [],
  });
  const [academicYearLists, setAcademicYearLists] = useState({
    count: 0,
    year: [],
  });

  const [date, setDate] = useState({
    count: 0,
    date: [],
  });

  return (
    <ThemeContext.Provider
      value={{
        userprofile,
        setUserProfile,
        facultyLists,
        setFacultyLists,
        academicYearLists,
        setAcademicYearLists,
        date,
        setDate,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useDataContext = () => useContext(ThemeContext);
