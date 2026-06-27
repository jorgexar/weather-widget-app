import { useContext, useState } from 'react';
import Searchbar from './Searchbar'
import {Link} from "react-router-dom";
import { TemperatureContext } from '../context/TemperatureContext';
import { ThemeContext } from '../context/ThemeContext';
import './Navbar.css';

function Navbar({ onSearch }) {
  const { unit, toggleUnit } = useContext(TemperatureContext);
  const { theme, toggleTheme, getAvailableThemes } = useContext(ThemeContext);
  const [isSearching, setIsSearching] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);

  const handleSearch = async (city) => {
    setIsSearching(true);
    try {
      onSearch(city);
    } finally {
      setIsSearching(false);
    }
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light': return '☀️';
      case 'dark': return '🌙';
      case 'ocean': return '🌊';
      case 'forest': return '🌲';
      default: return '🎨';
    }
  };

  const getThemeLabel = () => {
    const labels = {
      light: 'Light',
      dark: 'Dark',
      ocean: 'Ocean',
      forest: 'Forest',
    };
    return labels[theme] || 'Theme';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h1>Zephyr</h1>
        <h5>Weather Widget App</h5>
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </div>

      <Searchbar onSearch={handleSearch} isLoading={isSearching} />

      <div className="navbar-controls">
        <div className="theme-selector">
          <button 
            className="theme-toggle-button"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            title="Change theme"
          >
            <span className="theme-icon">{getThemeIcon()}</span>
            <span className="theme-label">{getThemeLabel()}</span>
          </button>
          {showThemeMenu && (
            <div className="theme-menu">
              {getAvailableThemes().map((availableTheme) => (
                <button
                  key={availableTheme}
                  className={`theme-option ${theme === availableTheme ? 'active' : ''}`}
                  onClick={() => {
                    toggleTheme();
                    setShowThemeMenu(false);
                  }}
                >
                  <span className="theme-option-icon">
                    {availableTheme === 'light' ? '☀️' : availableTheme === 'dark' ? '🌙' : availableTheme === 'ocean' ? '🌊' : '🌲'}
                  </span>
                  {availableTheme.charAt(0).toUpperCase() + availableTheme.slice(1)}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="temperature-toggle">
          <button 
            className={`toggle-button ${unit === 'C' ? 'active' : ''}`}
            onClick={toggleUnit}
          >
            <span className="toggle-label">°C / °F</span>
            <span className={`toggle-indicator ${unit === 'C' ? 'celsius' : 'fahrenheit'}`}>
              {unit}
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;