# 🌤️ Weather Widget Application

An intuitive, React-based dashboard that delivers real-time weather data by city name using the **OpenWeatherMap API**. The application features a responsive design, dynamic icons, and personalized user settings.

---

## ✨ Core Features

*   🔍 **Global Search:** Fetch current weather for any city instantly.
*   📊 **Detailed Insights:** View real-time temperature, humidity, wind speed, and weather conditions.
*   ⭐ **Favorites Management:** Save and remove favorite cities (seamlessly persisted via Local Storage).
*   🌡️ **Unit Toggle:** Switch between Celsius and Fahrenheit on the fly.
*   🌙 **Theme Customization:** Toggle between Light and Dark modes.
*   🛤️ **Smooth Navigation:** Multi-page experience powered by React Router (*Home, Favorites, City Details, and a custom 404 Page*).

> **Tech Stack Highlights:** Built to demonstrate mastery of React fundamentals, modern Hooks, Context API, client-side routing, advanced state management, and robust testing practices.

---

## 🚀 How to Run the Project Locally

Follow these steps to get your development environment up and running:

### 1. Clone & Navigate
```bash
git clone git@github.com:jorgexar/weather-widget-app.git
cd weather-widget-app

```

### 2. Install project dependencies

This project uses **npm**. Install all required dependencies listed in the `package.json` file by running:

```bash
npm install
```

This will install all required packages, including:
- React
- React Router
- Axios
- Vitest
- React Testing Library
- Vite
- Any other project dependencies
### 3. Configure Environment Variables

Create a .env file in the root directory of the project and add your API key:
```

VITE_API_KEY=your_api_key_here
```
    ⚠️ Note: The variable must start with VITE_ to be properly recognized and loaded by Vite.

### 4. Start the server
```
npm run dev
```

Once started, open your browser and navigate to: http://localhost:5173

## 🧪 Testing Suite

This project utilizes **Vitest** combined with **React Testing Library** for a modern, blazing-fast test experience.

### Running Tests

| Command | Description |
| :--- | :--- |
| `npm test` *or* `npx vitest` | Run the full test suite once |
| `npm test -- --watch` | Run tests in interactive watch mode |

### What is Covered:
*   **Component Rendering:** Assures UI pieces like `WeatherCard` and `SearchBar` mount correctly.
*   **User Interactions:** Validates search submissions, favorite toggles.
*   **Async API Behavior:** Features fully mocked OpenWeatherMap API responses for reliable testing.
*   **Conditional UI States:** Ensures robust error handling and loading states are gracefully displayed.

---

## 🧠 State Management Architecture

The application uses a strategic, hybrid approach to state management, pairing the right tool with the right job:

### 1. React Context API
Handles global, UI-wide state that cuts across the component tree.
*   **Stored Data:** Temperature unit (Celsius/Fahrenheit), Theme preference (Light/Dark), and their respective toggle functions.
*   **Why?** Keeps lightweight, app-wide preferences synchronized without the overhead of Redux.

### 2. Local Component State (`useState` / `useEffect`)
Handles isolated, component-specific lifecycles.
*   **Stored Data:** Fetched weather data per search, loading/error states, and form input controls.
*   **Why?** Prevents unnecessary global re-renders and keeps component logic self-contained.

### 3. Local Storage Persistence
Bridges the gap between sessions.
*   **Stored Data:** Favorite cities list, the last searched city, and user UI configurations.
*   **Why?** Ensures user data and preferences survive page reloads and browser restarts.