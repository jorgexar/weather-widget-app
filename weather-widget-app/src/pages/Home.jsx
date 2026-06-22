import { useState } from "react";
import { getWeather } from "../api/weatherApi";

function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  async function handleSearch() {
    console.log("Searching for city:", city);
    console.log("1")
    try {
      setLoading(true);
      setError("");
      console.log("2")
      const data = await getWeather(city);
      console.log("3")
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
      {weather && <pre>{JSON.stringify(weather, null, 2)}</pre>}
    </div>
  );
}

export default Home;
