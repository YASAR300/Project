import React, { useState, useEffect } from "react";
import "../css/potter.css"; 

const Potter = () => {
  const [characters, setCharacters] = useState([]);
  const [filteredCharacters, setFilteredCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHouse, setSelectedHouse] = useState("all");

  // Fetch data from the Harry Potter API
  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data || []);
        setLoading(false);
        setFilteredCharacters(data || []);
      })
      .catch((error) => console.error("Error fetching Potter API:", error));
  }, []);

  // Filter characters by house or name
  const filterCharacters = () => {
    let filtered = characters;

    // Filter by house
    if (selectedHouse !== "all") {
      filtered = filtered.filter((char) => char.house === selectedHouse);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter((char) =>
        char.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCharacters(filtered);
  };

  useEffect(() => {
    filterCharacters();
  }, [searchQuery, selectedHouse]);

  return (
    <div className="potter-container">
      <h1 className="potter-heading">Harry Potter Characters</h1>

      {/* Search bar */}
      <div className="potter-search-bar">
        <input
          className="potter-search-input"
          type="text"
          placeholder="Search characters..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* House filter */}
      <div className="potter-house-filter">
        <label htmlFor="house-selector" className="potter-house-label">Select House: </label>
        <select
          className="potter-house-select"
          id="house-selector"
          value={selectedHouse}
          onChange={(e) => setSelectedHouse(e.target.value)}
        >
          <option value="all">All Houses</option>
          <option value="Gryffindor">Gryffindor</option>
          <option value="Hufflepuff">Hufflepuff</option>
          <option value="Ravenclaw">Ravenclaw</option>
          <option value="Slytherin">Slytherin</option>
        </select>
      </div>

      {loading ? (
        <p className="potter-loading">Loading...</p>
      ) : (
        <ul className="potter-character-list">
          {filteredCharacters.map((char) => (
            <li key={char.name} className="potter-character-item">
              <div className="potter-character-content">
                <h3 className="potter-character-name">{char.name}</h3>
                <p className="potter-character-house">House: {char.house || "No house data"}</p>
                {char.image && (
                  <img
                    className="potter-character-image"
                    src={char.image}
                    alt={char.name}
                  />
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Potter;
