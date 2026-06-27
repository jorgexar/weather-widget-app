import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// Define available themes
const THEMES = {
  light: {
    name: 'light',
    colors: {
      bg: '#ffffff',
      'bg-secondary': '#f5f5f5',
      border: '#e0e0e0',
      text: '#333333',
      'text-secondary': '#666666',
      accent: '#667eea',
      'accent-bg': '#764ba2',
      'card-bg': '#ffffff',
      'shadow': 'rgba(0, 0, 0, 0.1)',
    },
  },
  dark: {
    name: 'dark',
    colors: {
      bg: '#1a1a1a',
      'bg-secondary': '#2d2d2d',
      border: '#404040',
      text: '#ffffff',
      'text-secondary': '#b0b0b0',
      accent: '#667eea',
      'accent-bg': '#764ba2',
      'card-bg': '#252525',
      'shadow': 'rgba(0, 0, 0, 0.3)',
    },
  },
  ocean: {
    name: 'ocean',
    colors: {
      bg: '#0a1929',
      'bg-secondary': '#132f4c',
      border: '#234a6d',
      text: '#e3f2fd',
      'text-secondary': '#b0bec5',
      accent: '#00bcd4',
      'accent-bg': '#0097a7',
      'card-bg': '#1a2a3a',
      'shadow': 'rgba(0, 188, 212, 0.15)',
    },
  },
  forest: {
    name: 'forest',
    colors: {
      bg: '#1b3a1b',
      'bg-secondary': '#2d5a2d',
      border: '#4a7a4a',
      text: '#e8f5e9',
      'text-secondary': '#c8e6c9',
      accent: '#4caf50',
      'accent-bg': '#388e3c',
      'card-bg': '#2a4a2a',
      'shadow': 'rgba(76, 175, 80, 0.15)',
    },
  },
};

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // Load theme preference from localStorage or default to light
    return localStorage.getItem('theme') || 'light';
  });

  // Update CSS variables whenever theme changes
  useEffect(() => {
    const selectedTheme = THEMES[theme];
    if (selectedTheme) {
      const root = document.documentElement;
      Object.entries(selectedTheme.colors).forEach(([key, value]) => {
        root.style.setProperty(`--${key}`, value);
      });
      
      // Save theme preference to localStorage
      localStorage.setItem('theme', theme);
      
      // Update body class for additional styling if needed
      document.body.className = `theme-${theme}`;
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const themes = Object.keys(THEMES);
      const currentIndex = themes.indexOf(prevTheme);
      const nextIndex = (currentIndex + 1) % themes.length;
      return themes[nextIndex];
    });
  };

  const changeTheme = (newTheme) => {
    if (THEMES[newTheme]) {
      setTheme(newTheme);
    }
  };

  const getThemeName = () => {
    return THEMES[theme]?.name || 'light';
  };

  const getAvailableThemes = () => {
    return Object.keys(THEMES);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, changeTheme, getThemeName, getAvailableThemes }}>
      {children}
    </ThemeContext.Provider>
  );
}
