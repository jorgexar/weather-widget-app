import './WeatherCard.css';

function WeatherCard({ weather }) {
  // Determine background gradient based on weather condition
  const getWeatherGradient = () => {
    const description = weather.weather[0].main.toLowerCase();
    
    switch (description) {
      case 'clear':
      case 'sunny':
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
      case 'clouds':
        return 'linear-gradient(135deg, #a8a9ad 0%, #5a5a5a 100%)';
      case 'rain':
      case 'drizzle':
        return 'linear-gradient(135deg, #4a5568 0%, #2d3748 100%)';
      case 'thunderstorm':
        return 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)';
      case 'snow':
        return 'linear-gradient(135deg, #e0f4ff 0%, #b3e5fc 100%)';
      case 'mist':
      case 'smoke':
      case 'haze':
      case 'dust':
      case 'fog':
      case 'sand':
      case 'ash':
      case 'squall':
      case 'tornado':
        return 'linear-gradient(135deg, #8b8b8b 0%, #5a5a5a 100%)';
      default:
        return 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
    }
  };

  return (
    <div 
      className="weather-card"
      style={{ background: getWeatherGradient() }}
    >
      <div className="weather-card-header">
        <div className="location-info">
          <h2 className="city-name">{weather.name}</h2>
          <p className="description">{weather.weather[0].description}</p>
        </div>
        <img 
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`}
          alt={weather.weather[0].description}
          className="weather-icon"
        />
      </div>

      <div className="temperature-section">
        <span className="temperature">{Math.round(weather.main.temp)}</span>
        <span className="celsius">°C</span>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <span className="detail-label">Humidity</span>
          <span className="detail-value">{weather.main.humidity}%</span>
        </div>
        <div className="divider"></div>
        <div className="detail-item">
          <span className="detail-label">Wind Speed</span>
          <span className="detail-value">{weather.wind.speed.toFixed(1)} m/s</span>
        </div>
      </div>

      {weather.main.feels_like && (
        <div className="feels-like">
          Feels like {Math.round(weather.main.feels_like)}°C
        </div>
      )}
    </div>
  );
}

export default WeatherCard;