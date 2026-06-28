import { useState } from "react";
import "./Searchbar.css";

function Searchbar({ onSearch, isLoading }) {
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = async () => {
    if (searchInput.trim()) {
      await onSearch(searchInput);
      setSearchInput("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="searchbar">
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Search city..."
        disabled={isLoading}
      />
      <button onClick={handleSearch} disabled={isLoading} role="search-button">
        {isLoading ? "..." : "Search"}
      </button>
    </div>
  );
}

export default Searchbar;
