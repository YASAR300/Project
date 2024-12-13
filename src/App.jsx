import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Meals from "./components/Meals";
import Cocktails from "./components/Cocktails";
import Potter from "./components/Potter";
import Banks from "./components/Banks";

const App = () => {
  return (
    <Router>
      <div>
      
        <nav>
          <ul>
            <li><Link to="/">Meals</Link></li>
            <li><Link to="/cocktails">Cocktails</Link></li>
            <li><Link to="/potter">Harry Potter</Link></li>
            <li><Link to="/banks">Banks Data</Link></li>
          </ul>
        </nav>

        
        <Routes>
          <Route path="/" element={<Meals />} />
          <Route path="/cocktails" element={<Cocktails />} />
          <Route path="/potter" element={<Potter />} />
          <Route path="/banks" element={<Banks />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
