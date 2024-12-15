import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Meals from "./components/Meals";
import Home from "./components/home";
import Potter from "./components/Potter";
import Banks from "./components/Banks";
import MealDetail from "./components/MealDetail";
import Navbar from "./components/Navbar";
import Cocktails from "./components/Cocktails";
import CocktailDetail from "./components/CocktailDetail";
// import NotFound from "./components/NotFound"; 

const App = () => {
  return (
    <Router>
     
      <Navbar />

      
      <div className="app-content">
        <Routes>
          
          <Route path="/" element={<Home />} />

          
          <Route path="/Meals" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/potter" element={<Potter />} />
          <Route path="/banks" element={<Banks />} />

          
          <Route path="/meal/:id" element={<MealDetail />} />
          <Route path="/cocktail/:id" element={<CocktailDetail />} />

          
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
