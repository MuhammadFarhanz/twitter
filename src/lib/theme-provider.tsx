import React, { ReactNode, useEffect } from "react";
import useThemeStore, { Accent, Theme } from "./store/theme-store";
// Make sure to import useThemeStore

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { changeTheme, changeAccent } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedAccent = localStorage.getItem("accent") as Accent;
    // Set the initial theme from localStorage, or use the default "dark" theme
    changeTheme(savedTheme || "dark");
    changeAccent(savedAccent || "blue");
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
