import { createContext, useState, useEffect } from 'react';

export const TemperatureContext = createContext();

export function TemperatureProvider({ children }) {
  const [unit, setUnit] = useState(() => {
    // Load unit preference from localStorage or default to Celsius
    return localStorage.getItem('temperatureUnit') || 'C';
  });

  useEffect(() => {
    // Save unit preference to localStorage whenever it changes
    localStorage.setItem('temperatureUnit', unit);
  }, [unit]);

  const toggleUnit = () => {
    setUnit(unit === 'C' ? 'F' : 'C');
  };

  const convertTemperature = (celsius) => {
    if (unit === 'C') {
      return Math.round(celsius);
    }
    // Convert Celsius to Fahrenheit: (C × 9/5) + 32
    return Math.round((celsius * 9/5) + 32);
  };

  const getApiUnit = () => {
    return unit === 'C' ? 'metric' : 'imperial';
  };

  return (
    <TemperatureContext.Provider value={{ unit, toggleUnit, convertTemperature, getApiUnit }}>
      {children}
    </TemperatureContext.Provider>
  );
}
