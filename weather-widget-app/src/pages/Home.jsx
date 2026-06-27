import { useState, useEffect, useContext } from "react";
import { useLocation } from "react-router-dom";
import { getWeather, getWeatherByCoordinates } from "../api/weatherApi";
import WeatherCard from "../components/WeatherCard";
import { TemperatureContext } from "../context/TemperatureContext";
import "./Home.css";

function Home() {
  const location = useLocation();
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { getApiUnit } = useContext(TemperatureContext);

  // Handle search from navbar
  useEffect(() => {
    if (location.state?.searchCity) {
      handleSearch(location.state.searchCity);
    }
  }, [location.state?.searchCity]);

  // Load saved location and request geolocation on component mount
  useEffect(() => {
    const loadWeatherFromStorage = async () => {
      const apiUnit = getApiUnit();
      
      // If no last searched city, load from saved geolocation
      const savedLocation = localStorage.getItem("userLocation");
      if (savedLocation) {
        try {
          const { latitude, longitude } = JSON.parse(savedLocation);
          const weatherData = await getWeatherByCoordinates(latitude, longitude, apiUnit);
          setWeather(weatherData);
          setError("");
        } catch (err) {
          console.log("Error loading saved location:", err);
        }
      }
      // First, try to load the last searched city
      const lastSearchedCity = localStorage.getItem("lastSearchedCity");
      
      if (lastSearchedCity) {
        try {
          const { name, weatherData } = JSON.parse(lastSearchedCity);
          // Refetch with the current unit
          const updatedWeatherData = await getWeather(name, apiUnit);
          setWeather(updatedWeatherData);
          setCity(name);
          setError("");
          return;
        } catch (err) {
          console.log("Error loading last searched city:", err);
        }
      }
    };

    const requestGeolocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const savedLocation = localStorage.getItem("userLocation");
              
              // Check if the new location is different from the saved one
              let isLocationChanged = true;
              if (savedLocation) {
                const { latitude: savedLat, longitude: savedLon } = JSON.parse(savedLocation);
                // Consider location same if coordinates are within 0.01 degrees (approximately 1km)
                isLocationChanged = 
                  Math.abs(latitude - savedLat) > 0.01 || 
                  Math.abs(longitude - savedLon) > 0.01;
              }
              
              // Save new location to localStorage
              localStorage.setItem(
                "userLocation",
                JSON.stringify({ latitude, longitude })
              );
              
              // Only fetch new weather if location changed
              // But don't override if user has searched for a specific city
              if (isLocationChanged) {
                const lastSearchedCity = localStorage.getItem("lastSearchedCity");
                // Only update if we're not showing a searched city
                if (!lastSearchedCity) {
                  const apiUnit = getApiUnit();
                  const weatherData = await getWeatherByCoordinates(latitude, longitude, apiUnit);
                  setWeather(weatherData);
                }
              }
              
              setError("");
            } catch (err) {
              setError("Failed to fetch weather for your location");
              console.log("Error fetching weather:", err);
            }
          },
          (error) => {
            console.log("Geolocation permission denied or error:", error);
            // Don't set an error - just let user search manually
          }
        );
      }
    };

    // Load saved data first (from cache)
    setLoading(true);
    loadWeatherFromStorage().finally(() => {
      setLoading(false);
      // Then request current geolocation
      requestGeolocation();
    });
  }, [getApiUnit]);

  async function handleSearch(searchCity) {
    console.log("Searching for city:", searchCity);
    try {
      setLoading(true);
      setError("");
      const apiUnit = getApiUnit();
      const data = await getWeather(searchCity, apiUnit);
      setWeather(data);
      setCity(searchCity);
      
      // Save the searched city and its weather data to localStorage
      localStorage.setItem(
        "lastSearchedCity",
        JSON.stringify({ name: searchCity, weatherData: data })
      );
    } catch (err) {
      setError("City not found");
      console.log("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="home-page">
      <h1>Home Page</h1>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading weather data...</p>}
      {weather && (
        <div className="weather-card-container">
          <WeatherCard weather={weather} />
        </div>
      )}
    </div>
  );
}

export default Home;
