import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TemperatureProvider } from "../../context/TemperatureContext";
import WeatherCard from "../WeatherCard";

const mockWeather = {
  name: "Athens",
  weather: [
    {
      main: "Clear",
      description: "clear sky",
      icon: "01d",
    },
  ],
  main: {
    temp: 25,
    humidity: 40,
    feels_like: 27,
  },
  wind: {
    speed: 3.2,
  },
};

function renderWithProviders(ui) {
  return render(
    <BrowserRouter>
      <TemperatureProvider>
        {ui}
      </TemperatureProvider>
    </BrowserRouter>
  );
}

test("renders city name", () => {
  renderWithProviders(<WeatherCard weather={mockWeather} />);

  expect(screen.getByText("Athens")).toBeInTheDocument();
});