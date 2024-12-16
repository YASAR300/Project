import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../css/meals.css";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [categories, setCategories] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchMeals(); 
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/categories.php"
      );
      const data = await response.json();
      setCategories(data.categories || []);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  const fetchMeals = async () => {
    setLoading(true);
    setError(null);
    try {
      const categoryQuery = selectedCategory
        ? `filter.php?c=${selectedCategory}`
        : query
        ? `search.php?s=${query}`
        : ""; // If no query and no category, load default meals
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/${categoryQuery || "search.php?s="}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (err) {
      setError("Failed to fetch meals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleMealClick = (meal) => {
    navigate(`/meal/${meal.idMeal}`, { state: { meal } });
  };

  return (
    <div className="meals-app">
      <header className="meals-header">
        <h1>Meal Explorer</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search meals..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedCategory(""); // Clear category if typing query
              fetchMeals(); // Trigger search when query changes
            }}
          />
          <button onClick={fetchMeals}>Search</button>
        </div>
        <div className="category-selector">
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value);
              setQuery(""); // Clear query if selecting category
              fetchMeals(); // Trigger category filter when changed
            }}
          >
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option key={category.idCategory} value={category.strCategory}>
                {category.strCategory}
              </option>
            ))}
          </select>
          <button onClick={fetchMeals}>Filter</button>
        </div>
      </header>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : meals.length === 0 ? (
        <p className="no-results">No meals found. Try a different search.</p>
      ) : (
        <div className="meals-container">
          {meals.map((meal) => (
            <div
              className="meal-card"
              key={meal.idMeal}
              onClick={() => handleMealClick(meal)}
            >
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
              <div className="meal-details">
                <h3>{meal.strMeal}</h3>
                <p>{meal.strCategory}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Meals;
