import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getWeather } from "../api/weatherApi";
import { TemperatureContext } from "../context/TemperatureContext";
import "./CityDetails.css";

function CityDetails() {
  const { cityName } = useParams();
  const navigate = useNavigate();
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { unit, getApiUnit } = useContext(TemperatureContext);

  useEffect(() => {
    const fetchCityDetails = async () => {
      try {
        setLoading(true);
        setError("");
        const apiUnit = getApiUnit();
        const data = await getWeather(cityName, apiUnit);
        setWeather(data);
      } catch (err) {
        setError(`Failed to load weather for ${cityName}`);
        console.log("Error fetching city details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCityDetails();
  }, [cityName, getApiUnit]);

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  };

  if (loading) {
    return (
      <div className="city-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p className="loading">Loading weather details...</p>
      </div>
    );
  }

  if (error || !weather) {
    return (
      <div className="city-details">
        <button className="back-button" onClick={() => navigate(-1)}>
          ← Back
        </button>
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="city-details">
      <button className="back-button" onClick={() => navigate(-1)}>
        ← Back
      </button>

      <div className="city-header">
        <div className="city-info">
          <h1>{weather.name}</h1>
          {weather.sys && (
            <p className="location">
              {weather.sys.country && `${weather.sys.country} • `}
              Coordinates: {weather.coord.lat.toFixed(2)}°, {weather.coord.lon.toFixed(2)}°
            </p>
          )}
        </div>
        <img
          src={getWeatherIcon(weather.weather[0].icon)}
          alt={weather.weather[0].description}
          className="main-weather-icon"
        />
      </div>

      <div className="current-weather">
        <div className="temperature-section">
          <span className="main-temperature">{Math.round(weather.main.temp)}</span>
          <span className="degree-symbol">°{unit}</span>
        </div>
        <div className="weather-description">
          <p className="condition">{weather.weather[0].main}</p>
          <p className="description">{weather.weather[0].description}</p>
        </div>
      </div>

      <div className="details-grid">
        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <p className="detail-label">Feels Like</p>
            <p className="detail-value">
              {Math.round(weather.main.feels_like)}°{unit}
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💧</div>
          <div className="detail-content">
            <p className="detail-label">Humidity</p>
            <p className="detail-value">{weather.main.humidity}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">💨</div>
          <div className="detail-content">
            <p className="detail-label">Wind Speed</p>
            <p className="detail-value">
              {weather.wind.speed.toFixed(1)} {unit === "C" ? "m/s" : "mph"}
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🧭</div>
          <div className="detail-content">
            <p className="detail-label">Wind Direction</p>
            <p className="detail-value">
              {getWindDirection(weather.wind.deg)} ({weather.wind.deg}°)
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🔽</div>
          <div className="detail-content">
            <p className="detail-label">Pressure</p>
            <p className="detail-value">{weather.main.pressure} hPa</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">👁️</div>
          <div className="detail-content">
            <p className="detail-label">Visibility</p>
            <p className="detail-value">
              {(weather.visibility / 1000).toFixed(1)} km
            </p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">☁️</div>
          <div className="detail-content">
            <p className="detail-label">Cloud Coverage</p>
            <p className="detail-value">{weather.clouds.all}%</p>
          </div>
        </div>

        <div className="detail-card">
          <div className="detail-icon">🌡️</div>
          <div className="detail-content">
            <p className="detail-label">Temperature Range</p>
            <p className="detail-value">
              {Math.round(weather.main.temp_min)}° to {Math.round(weather.main.temp_max)}°
            </p>
          </div>
        </div>
      </div>

      {weather.sys && (
        <div className="sun-section">
          <div className="sun-card">
            <div className="sun-icon">🌅</div>
            <div className="sun-info">
              <p className="sun-label">Sunrise</p>
              <p className="sun-time">{formatTime(weather.sys.sunrise)}</p>
            </div>
          </div>
          <div className="sun-card">
            <div className="sun-icon">🌇</div>
            <div className="sun-info">
              <p className="sun-label">Sunset</p>
              <p className="sun-time">{formatTime(weather.sys.sunset)}</p>
            </div>
          </div>
        </div>
      )}

      {weather.rain && (
        <div className="additional-info">
          <p className="info-label">💧 Precipitation (last hour)</p>
          <p className="info-value">{weather.rain["1h"]} mm</p>
        </div>
      )}

      {weather.snow && (
        <div className="additional-info">
          <p className="info-label">❄️ Snow (last hour)</p>
          <p className="info-value">{weather.snow["1h"]} mm</p>
        </div>
      )}

      {weather.sys && weather.sys.timezone && (
        <div className="additional-info">
          <p className="info-label">🕐 Timezone</p>
          <p className="info-value">UTC {(weather.sys.timezone / 3600).toFixed(0).replace("-", "−")}</p>
        </div>
      )}
    </div>
  );
}

export default CityDetails;