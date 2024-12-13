import React, { useState, useEffect } from "react";

const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]); // Ensure cocktails is always an array
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCocktails();
  }, []);

  const fetchCocktails = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      // Check if the drinks key exists and is an array
      if (Array.isArray(data.drinks)) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]); // No results
      }
    } catch (err) {
      console.error("Error fetching cocktails:", err);
      setError("Failed to load data. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h1>Cocktails</h1>
      <input
        type="text"
        placeholder="Search cocktails..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={fetchCocktails}>Search</button>

      
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

     
      {cocktails.length > 0 ? (
        <ul>
          {cocktails.map((cocktail) => (
            <li key={cocktail.idDrink}>
              <h3>{cocktail.strDrink}</h3>
              <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
            </li>
          ))}
        </ul>
      ) : (
        !loading && <p>No results found.</p>
      )}
    </div>
  );
};

export default Cocktails;
