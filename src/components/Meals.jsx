import React, { useState, useEffect } from "react";

const Meals = () => {
  const [meals, setMeals] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMeals();
  }, []);

  const fetchMeals = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();
      setMeals(data.meals || []);
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Meals</h1>
      <input
        type="text"
        placeholder="Search meals..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchMeals}>Search</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {meals.map((meal) => (
            <li key={meal.idMeal}>
              <h3>{meal.strMeal}</h3>
              <img src={meal.strMealThumb} alt={meal.strMeal} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Meals;
