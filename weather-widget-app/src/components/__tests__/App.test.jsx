import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { TemperatureProvider } from "../../context/TemperatureContext";
import { ThemeProvider } from "../../context/ThemeContext";
import App from "../../App";
import * as api from "../../api/weatherApi";
import { vi } from "vitest";

vi.mock("../../api/weatherApi", () => ({
  getWeather: vi.fn(),
}));

const mockWeather = {
  name: "Athens",
  weather: [{ main: "Clear", description: "clear sky", icon: "01d" }],
  main: { temp: 25, humidity: 40, feels_like: 27 },
  wind: { speed: 3.2 },
};

test("full app flow: search → fetch → display weather", async () => {
  const user = userEvent.setup();

  api.getWeather.mockResolvedValue(mockWeather);

  render(
    <BrowserRouter>
      <TemperatureProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </TemperatureProvider>
    </BrowserRouter>
  );

  const input = screen.getByRole("textbox");
  const button = screen.getByRole("search-button");

  await user.type(input, "Athens");
  await user.click(button);

  expect(await screen.findByText("Athens")).toBeInTheDocument();
  expect(await screen.findByText(/Humidity/i)).toBeInTheDocument();
});
test("shows loading state while fetching weather", async () => {
  const user = userEvent.setup();

  api.getWeather.mockImplementation(
    () => new Promise((resolve) => setTimeout(() => resolve(mockWeather), 200))
  );

  render(
   <BrowserRouter>
      <TemperatureProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </TemperatureProvider>
    </BrowserRouter>
  );

  const input = screen.getByRole("textbox");
  const button = screen.getByRole("search-button");

  await user.type(input, "Athens");
  await user.click(button);

  expect(screen.getByText(/loading weather data/i)).toBeInTheDocument();
});

test("shows error message when API call fails", async () => {
  const user = userEvent.setup();

  api.getWeather.mockRejectedValue(new Error("API failed"));

  render(
    <BrowserRouter>
      <TemperatureProvider>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </TemperatureProvider>
    </BrowserRouter>
  );

  const input = screen.getByRole("textbox");
  const button = screen.getByRole("search-button");

  await user.type(input, "InvalidCity");
  await user.click(button);

  expect(await screen.findByText(/city not found/i)).toBeInTheDocument();
});