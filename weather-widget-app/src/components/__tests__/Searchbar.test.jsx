import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Searchbar from "../Searchbar";
import * as api from "../../api/weatherApi";
import { vi } from "vitest";

vi.mock("../../api/weatherApi");

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
  },
  wind: {
    speed: 3.2,
  },
};

function renderUI() {
  return render(
    <BrowserRouter>
      <Searchbar />
    </BrowserRouter>
  );
}

test("calls onSearch when user submits a city", async () => {
  const user = userEvent.setup();

  const mockOnSearch = vi.fn();

  render(<Searchbar onSearch={mockOnSearch} isLoading={false} />);

  const input = screen.getByRole("textbox");
  const button = screen.getByRole("search-button");

  await user.type(input, "Athens");
  await user.click(button);

  expect(mockOnSearch).toHaveBeenCalledWith("Athens");
});
test("calls onSearch when Enter key is pressed", async () => {
  const user = userEvent.setup();
  const mockOnSearch = vi.fn();

  render(<Searchbar onSearch={mockOnSearch} isLoading={false} />);

  const input = screen.getByRole("textbox");

  await user.type(input, "Athens");
  await user.keyboard("{Enter}");

  expect(mockOnSearch).toHaveBeenCalledWith("Athens");
});

test("disables input and button when loading", () => {
  const mockOnSearch = vi.fn();

  render(<Searchbar onSearch={mockOnSearch} isLoading={true} />);

  expect(screen.getByRole("textbox")).toBeDisabled();
  expect(screen.getByRole("search-button")).toBeDisabled();
});