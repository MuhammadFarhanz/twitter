import React, { ReactNode, useEffect } from "react";
import useThemeStore, { Accent, Theme } from "./theme-store";
// Make sure to import useThemeStore

const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { theme, accent, changeTheme, changeAccent } = useThemeStore();

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    const savedAccent = localStorage.getItem("accent") as Accent;
    // Set the initial theme from localStorage, or use the default "dark" theme
    changeTheme(savedTheme || "dark");
    changeAccent(savedAccent || "blue");

    // Your initialization logic here, e.g., applying initial theme
    // or fetching the user's preferred theme from an API
    // console.log("Theme initialized:", theme, accent);
  }, []);

  return <>{children}</>;
};

export default ThemeProvider;
