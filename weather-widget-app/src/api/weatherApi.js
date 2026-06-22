import axios from "axios";

const API_KEY = import.meta.env.VITE_API_KEY;

export async function getWeather(city) {
  const response = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric"
      }
    }
  );

  return response.data;
}