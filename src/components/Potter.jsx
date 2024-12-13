import React, { useState, useEffect } from "react";

const Potter = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://hp-api.onrender.com/api/characters")
      .then((res) => res.json())
      .then((data) => {
        setCharacters(data || []);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching Potter API:", error));
  }, []);

  return (
    <div>
      <h1>Harry Potter Characters</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {characters.map((char) => (
            <li key={char.name}>
              <h3>{char.name}</h3>
              <p>House: {char.house || "No house data"}</p>
              {char.image && <img src={char.image} alt={char.name} width="100" />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Potter;
