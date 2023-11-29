// themeStore.ts

import { ReactNode, useEffect } from "react";
import { create } from "zustand";

export type Theme = "light" | "dim" | "dark";
export type Accent = "blue" | "yellow" | "pink" | "purple" | "orange" | "green";

type ThemeStore = {
  theme: Theme;
  accent: any; // Corrected the type here
  changeTheme: (value: Theme) => void;
  changeAccent: (value: any) => void;
};

const useThemeStore = create<ThemeStore>((set) => ({
  theme: "dark",
  accent: "blue", // Corrected the type here
  changeTheme: (value) => handleChange(set, "theme", value),
  changeAccent: (value) => handleChange(set, "accent", value),
}));

function getInitialValue(key: string, defaultValue: string) {
  if (typeof window === "undefined") return defaultValue;
  const savedValue = localStorage.getItem(key);
  return (savedValue as Theme | Accent) || defaultValue;
}

function handleChange(
  set: (state: (prevState: ThemeStore) => ThemeStore) => void,
  key: string,
  value: Theme
) {
  const root = document.documentElement;
  console.log("value ini", value);
  const targetTheme = value === "dim" ? "dark" : value;

  if (targetTheme === "dark") {
    root.classList.add("dark");
  } else if (targetTheme === "light") {
    root.classList.remove("dark");
  }

  if (key === "theme") {
    root.style.setProperty(`--main-background`, `var(--${value}-background)`);
    root.style.setProperty(
      `--main-search-background`,
      `var(--${value}-search-background)`
    );
    root.style.setProperty(
      `--main-sidebar-background`,
      `var(--${value}-sidebar-background)`
    );
  }

  if (key === "accent") {
    root.style.setProperty(`--main-accent`, `var(--accent-${value})`);
  }

  const isDarkMode = document.documentElement.classList.contains("dark");
  console.log("Is Dark Mode:", isDarkMode);

  set((state) => ({ ...state, [key]: value }));
  localStorage.setItem(key, value as string);

  // Schedule an update for the user's theme/accent if there's a user
  // Add your logic here to update the user theme/accent
}

export default useThemeStore;
