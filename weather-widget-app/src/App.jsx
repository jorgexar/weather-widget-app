import { useState } from 'react'
import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";


import Navbar from './components/Navbar'
import './App.css'


import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import CityDetails from "./pages/CityDetails";
import NotFound from "./pages/NotFound";
function App() {
  const navigate = useNavigate();

  const handleSearch = (city) => {
    navigate("/", { state: { searchCity: city } });
  };

  return (
    <>
     <Navbar onSearch={handleSearch} />
     <Routes>
       <Route path="/" element={<Home />} />
       <Route path="/favorites" element={<Favorites />} />
       <Route path="*" element={<NotFound />} />
       <Route path="/city/:cityName" element={<CityDetails />} />
     </Routes>
    </>
  )
}

export default App
