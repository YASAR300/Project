import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/meals.css";

const MealDetail = () => {
  const { state } = useLocation();
  const { meal } = state || {};
  const navigate = useNavigate();

  if (!meal) {
    return <p>No meal details available. Please go back and select a meal.</p>;
  }

  return (
    <div className="meal-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ Back
      </button>
      <h1>{meal.strMeal}</h1>
      <iframe
        className="meal-video"
        src={meal.strYoutube.replace("watch?v=", "embed/")}
        title={meal.strMeal}
        allowFullScreen
      ></iframe>
      <div className="meal-info">
        <h2>Category: {meal.strCategory}</h2>
        <h3>Cuisine: {meal.strArea}</h3>
        <h4>Ingredients:</h4>
        <ul>
          {Object.keys(meal)
            .filter((key) => key.startsWith("strIngredient") && meal[key])
            .map((key, index) => (
              <li key={index}>
                {meal[key]} - {meal[`strMeasure${index + 1}`]}
              </li>
            ))}
        </ul>
        <h4>Instructions:</h4>
        <p>{meal.strInstructions}</p>
      </div>
    </div>
  );
};

export default MealDetail;
