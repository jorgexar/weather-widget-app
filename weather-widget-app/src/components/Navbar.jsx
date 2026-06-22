import Searchbar from './Searchbar'
import {Link} from "react-router-dom";
function Navbar() {
  return (
    <nav className="navbar">
      <div>
      <h1>Zephyr</h1>
      <h5>Weather Widget App</h5>

      </div>
      <Link to="/">Home</Link>
      {/* <Link to="/city/:cityName">City Details</Link> */}
      {/* <Link to="/notfound">Not Found</Link> */}
      <Link to="/favorites">Favorites</Link>
      <Searchbar />
    </nav>
  );
}

export default Navbar;