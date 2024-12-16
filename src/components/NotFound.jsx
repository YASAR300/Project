import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/NotFound.css"; 

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="not-found">
      <h1 className="not-found-title">404</h1>
      <p className="not-found-message">Oops! The page you are looking for does not exist.</p>
      <button className="go-home-btn" onClick={() => navigate("/")}>Go Home</button>
    </div>
  );
};

export default NotFound;
