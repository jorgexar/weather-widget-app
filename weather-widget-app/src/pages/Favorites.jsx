import { useState, useEffect, useContext } from "react";
import { getWeather } from "../api/weatherApi";
import WeatherCard from "../components/WeatherCard";
import { TemperatureContext } from "../context/TemperatureContext";
import "./Favorites.css";

function Favorites() {
  const [favorites, setFavorites] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getApiUnit } = useContext(TemperatureContext);

  // Load favorite cities from localStorage and fetch their weather data
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        setLoading(true);
        setError("");
        
        const savedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
        setFavorites(savedFavorites);

        if (savedFavorites.length === 0) {
          setLoading(false);
          return;
        }

        // Fetch weather data for each favorite city
        const weatherDataMap = {};
        const apiUnit = getApiUnit();
        for (const city of savedFavorites) {
          try {
            const data = await getWeather(city, apiUnit);
            weatherDataMap[city] = data;
          } catch (err) {
            console.log(`Error fetching weather for ${city}:`, err);
            weatherDataMap[city] = null;
          }
        }

        setWeatherData(weatherDataMap);
      } catch (err) {
        setError("Failed to load favorites");
        console.log("Error loading favorites:", err);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, [getApiUnit]);

  const handleFavoriteRemoved = (cityName) => {
    // Remove city from favorites list
    setFavorites((prevFavorites) => 
      prevFavorites.filter((city) => city !== cityName)
    );
    
    // Remove weather data for that city
    setWeatherData((prevWeatherData) => {
      const updatedData = { ...prevWeatherData };
      delete updatedData[cityName];
      return updatedData;
    });
  };

  if (loading) {
    return (
      <div className="favorites-page">
        <h1>My Favorites</h1>
        <p>Loading favorite cities...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="favorites-page">
        <h1>My Favorites</h1>
        <p style={{ color: "red" }}>{error}</p>
      </div>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="favorites-page">
        <h1>My Favorites</h1>
        <p className="empty-message">No favorite cities yet. Add some from the home page!</p>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      <div className="weather-cards-grid">
        {favorites.map((city) => (
          weatherData[city] ? (
            <WeatherCard 
              key={city} 
              weather={weatherData[city]} 
              onFavoriteRemoved={handleFavoriteRemoved}
            />
          ) : null
        ))}
      </div>
    </div>
  );
}

export default Favorites;