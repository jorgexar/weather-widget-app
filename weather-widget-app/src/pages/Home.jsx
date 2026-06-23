import { useState, useEffect } from "react";
import { getWeather, getWeatherByCoordinates } from "../api/weatherApi";
import WeatherCard from "../components/WeatherCard";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Request geolocation on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords;
            const weatherData = await getWeatherByCoordinates(latitude, longitude);
            setWeather(weatherData);
            setError("");
          } catch (err) {
            setError("Failed to fetch weather for your location");
            console.log("Error fetching weather:", err);
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.log("Geolocation permission denied or error:", error);
          setLoading(false);
          // Don't set an error - just let user search manually
        }
      );
    }
  }, []);

  async function handleSearch() {
    console.log("Searching for city:", city);
    console.log("1");
    try {
      setLoading(true);
      setError("");
      console.log("2");
      const data = await getWeather(city);
      console.log("3");
      setWeather(data);
    } catch (err) {
      setError("City not found");
      console.log("Error fetching weather:", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h1>Home Page</h1>
      <div className="searchbar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
        />

        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {loading && <p>Loading weather data...</p>}
      {weather && <WeatherCard weather={weather} />}
    </div>
  );
}

export default Home;
