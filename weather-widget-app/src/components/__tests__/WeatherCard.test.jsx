import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { TemperatureProvider } from "../../context/TemperatureContext";
import userEvent from "@testing-library/user-event";
import WeatherCard from "../WeatherCard";
import { beforeEach } from "vitest";

beforeEach(() => {
  localStorage.clear();
});
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

test("adds city to favorites when favorite button is clicked", async () => {
  renderWithProviders(<WeatherCard weather={mockWeather} />);

  const favoriteButton = screen.getByRole("button", { name: /add to favorites/i });

  await userEvent.click(favoriteButton);

  expect(localStorage.getItem("favorites")).toContain("Athens");

  expect(favoriteButton).toHaveClass("favorited");
});
test("removes city from favorites when favorite button is clicked", async () => {
  renderWithProviders(<WeatherCard weather={mockWeather} />);

  const favoriteButton = screen.getByRole("button");

  await userEvent.click(favoriteButton);

  await userEvent.click(favoriteButton);

  const favorites = JSON.parse(localStorage.getItem("favorites"));

  expect(favorites).not.toContain("Athens");
  expect(favoriteButton).not.toHaveClass("favorited");
});