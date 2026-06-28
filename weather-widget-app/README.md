Project Overview

This Weather Widget Application is a React-based project that allows users to search for real-time weather data by city name using the OpenWeatherMap API. The application displays current weather conditions including temperature, humidity, wind speed, and descriptive weather states with dynamic icons.

Users can:

Search for any city’s current weather
View detailed weather information
Save and remove favorite cities (persisted in local storage)
Toggle between Celsius and Fahrenheit units
Switch between light and dark themes
Navigate between pages using React Router (Home, Favorites, City Details, 404 page)

The project demonstrates the use of React fundamentals, hooks, context API, routing, state management, and testing practices.

🚀 How to Run the Project Locally
1. Clone the repository
git clone <your-repo-url>
2. Navigate into the project folder
cd weather-widget-app
3. Install dependencies
npm install
4. Add environment variables

Create a .env file in the root directory:

VITE_OPEN_WEATHER_API_KEY=your_api_key_here

Make sure the variable starts with VITE_ since this is required by Vite.

5. Start the development server
npm run dev

The app will run at:

http://localhost:5173
🧪 How to Run the Test Suite

This project uses Vitest + React Testing Library.

Run tests:
npm test

or (depending on config):

npx vitest
Run tests in watch mode:
npm test -- --watch
What is tested:
Component rendering (WeatherCard, SearchBar, etc.)
User interactions (search, favorites, toggles)
Async API behavior (mocked OpenWeatherMap calls)
Conditional UI states (loading and error handling)
🧠 State Management Approach

This project uses a hybrid state management approach:

1. React Context API

Used for global UI-related state:

Temperature unit (Celsius/Fahrenheit)
Theme (light/dark)
Shared toggle functions

Context was chosen because these values are:

Used across multiple components
Lightweight and do not require complex logic
2. Local Component State (useState / useEffect)

Used for:

Weather data fetched per search
Loading and error states
Input handling
3. Local Storage Persistence

Used to persist:

Favorite cities
Last searched city
User preferences (theme/unit)

This ensures data remains available after page reloads.