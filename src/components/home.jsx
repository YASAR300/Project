import React from "react";
import { Link } from "react-router-dom";
import "../css/home.css"; 

const Home = () => {
  return (
    <div className="home">
      <h1 className="home-title">Welcome to the Dashboard!</h1>
      <p className="home-subtitle">Explore our collections and enjoy!</p>

      <div className="categories">
        <div className="category-card">
          <Link to="/Meals">
            <h2>Meals</h2>
            <p>Discover delicious meals and recipes.</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/cocktails">
            <h2>Cocktails</h2>
            <p>Find amazing cocktail recipes for every occasion.</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/potter">
            <h2>Harry Potter</h2>
            <p>Explore the magical world of Harry Potter.</p>
          </Link>
        </div>
        <div className="category-card">
          <Link to="/banks">
            <h2>Banks Data</h2>
            <p>Browse detailed information about banks.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
