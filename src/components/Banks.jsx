import React, { useState, useEffect } from "react";

const IndianBanks = () => {
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [center, setCenter] = useState("");
  const [branch, setBranch] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);

  // Fetching list of states (example, replace with actual API endpoint if available)
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://api.example.com/states");
        const result = await response.json();
        setStates(result.states); // Assuming the response returns an array of state names
      } catch (err) {
        console.error("Failed to fetch states:", err);
      }
    };

    fetchStates();
  }, []);

  // Fetching districts based on selected state
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!state) return;

      try {
        const response = await fetch(`https://api.example.com/districts/${state}`);
        const result = await response.json();
        setDistricts(result.districts); // Assuming response contains an array of districts
      } catch (err) {
        console.error("Failed to fetch districts:", err);
      }
    };

    fetchDistricts();
  }, [state]);

  const fetchBranchData = async () => {
    setLoading(true);
    setError(null);

    const url = `https://bank-apis.justinclicks.com/API/V1/STATE/${state}/DISTRICT/${district}/CITY/${city}/CENTER/${center}/BRANCH/${branch}.json`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
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
    <div>
      <h1>Indian Banks API</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!state || !district || !city || !branch) {
            setError("All fields are required.");
            return;
          }
          fetchBranchData();
        }}
      >
        <select value={state} onChange={(e) => setState(e.target.value)}>
          <option value="">Select State</option>
          {states.map((stateName) => (
            <option key={stateName} value={stateName}>
              {stateName}
            </option>
          ))}
        </select>

        <select value={district} onChange={(e) => setDistrict(e.target.value)} disabled={!state}>
          <option value="">Select District</option>
          {districts.map((districtName) => (
            <option key={districtName} value={districtName}>
              {districtName}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="text"
          placeholder="Center"
          value={center}
          onChange={(e) => setCenter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Branch"
          value={branch}
          onChange={(e) => setBranch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {data && (
        <div>
          <h2>Branch Details</h2>
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
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
