import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/cocktailDetail.css";

const CocktailDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const { cocktail } = state || {};

  if (!cocktail) {
    return <p>No cocktail details available. Please go back and select one.</p>;
  }

  return (
    <div className="cocktail-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <h1>{cocktail.strDrink}</h1>
      <iframe
        className="cocktail-video"
        src={cocktail.strVideo ? cocktail.strVideo.replace("watch?v=", "embed/") : ""}
        title={cocktail.strDrink}
        allowFullScreen
      ></iframe>
      <div className="cocktail-info">
        <h2>Category: {cocktail.strCategory}</h2>
        <h3>Type: {cocktail.strAlcoholic}</h3>
        <h4>Glass Type: {cocktail.strGlass}</h4>
        <h4>Ingredients:</h4>
        <ul>
          {Object.keys(cocktail)
            .filter((key) => key.startsWith("strIngredient") && cocktail[key])
            .map((key, index) => (
              <li key={index}>
                {cocktail[key]} - {cocktail[`strMeasure${index + 1}`]}
              </li>
            ))}
        </ul>
        <h4>Instructions:</h4>
        <p>{cocktail.strInstructions}</p>
      </div>
    </div>
  );
};

export default CocktailDetail;
