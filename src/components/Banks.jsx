import React, { useState } from "react";
import "../css/bank.css";

const IndianBanks = () => {
  const [ifscCode, setIfscCode] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranchData = async () => {
    if (!ifscCode) {
      setError("Please enter a valid IFSC code.");
      return;
    }

    setLoading(true);
    setError(null);

    const url = `https://bank-apis.justinclicks.com/API/V1/IFSC/${ifscCode.toUpperCase()}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("IFSC code not found.");
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="indian-banks-container">
      <h1 className="indian-banks-title">Search Indian Bank Branch by IFSC</h1>

      <div className="indian-banks-form">
        <input
          type="text"
          className="indian-banks-input"
          placeholder="Enter IFSC Code"
          value={ifscCode}
          onChange={(e) => setIfscCode(e.target.value)}
        />
        <button className="indian-banks-button" onClick={fetchBranchData}>Search</button>
      </div>

      {loading && <p className="indian-banks-loading">Loading...</p>}
      {error && <p className="indian-banks-error">{error}</p>}

      {data && (
        <div className="indian-banks-details">
          <h2 className="indian-banks-details-title">Branch Details</h2>
          <ul className="indian-banks-details-list">
            {Object.entries(data).map(([key, value]) => (
              <li key={key} className="indian-banks-details-item">
                <strong>{key}:</strong> {value}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IndianBanks;
