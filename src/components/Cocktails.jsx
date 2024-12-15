import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/cocktails.css";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [categories, setCategories] = useState([]); // To store cocktail categories
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [query, setQuery] = useState(""); // Search input value
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch categories and default cocktails
  useEffect(() => {
    fetchCocktails("margarita"); // Default cocktail search
    fetchCategories(); // Fetch categories
  }, []);

  // Function to fetch cocktails by query or category
  const fetchCocktails = async (searchQuery) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`
      );
      const data = await response.json();

      if (Array.isArray(data.drinks)) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }
    } catch (err) {
      console.error("Error fetching cocktails:", err);
      setError("Failed to load data. Please try again.");
    }
    setLoading(false);
  };

  // Function to fetch cocktail categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`
      );
      const data = await response.json();

      if (Array.isArray(data.drinks)) {
        setCategories(data.drinks.map((item) => item.strCategory)); // Extract category names
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Handle search by query
  const handleSearch = () => {
    fetchCocktails(query || "margarita");
  };

  // Handle search by category
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    fetchCocktails(category);
  };

  // Navigate to cocktail detail
  const handleCocktailClick = (cocktail) => {
    navigate(`/cocktail/${cocktail.idDrink}`, { state: { cocktail } });
  };

  return (
    <div className="cocktails-container">
      <h1 className="title">Explore Cocktails</h1>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a cocktail..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Category Dropdown */}
      <div className="category-dropdown">
        <label htmlFor="category">Filter by Category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">-- Select a Category --</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Loading and Error States */}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}

      {/* No Results Message */}
      {!loading && cocktails.length === 0 && (
        <p className="no-results">
          No results found. Try searching for a specific drink or category!
        </p>
      )}

      {/* Cocktail List */}
      <div className="cocktail-list">
        {cocktails.map((cocktail) => (
          <div
            key={cocktail.idDrink}
            className="cocktail-card"
            onClick={() => handleCocktailClick(cocktail)}
          >
            <img
              src={cocktail.strDrinkThumb}
              alt={cocktail.strDrink}
              className="cocktail-image"
            />
            <div className="cocktail-info">
              <h3>{cocktail.strDrink}</h3>
              <p>
                Category: <strong>{cocktail.strCategory || "Unknown"}</strong>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cocktails;
