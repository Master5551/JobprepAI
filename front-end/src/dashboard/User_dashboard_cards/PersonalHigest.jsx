import React, { useEffect, useState } from "react";
import "./personalhighest.css";

const PersonalHigh = ({ backgroundColor, apiUrl, title, showDropdown }) => {
  const cardStyle = {
    backgroundColor: backgroundColor, // Dynamically set background color
  };
  const [datas, setData] = useState(null);
  const [dropdownOptions, setDropdownOptions] = useState([]); // State to store dropdown options

  const [selectedOption, setSelectedOption] = useState(""); // State to track selected option

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl]);

  useEffect(() => {
    const fetchDropdownOptions = async () => {
      try {
        const response = await fetch("http://localhost:3001/tables");
        if (!response.ok) {
          throw new Error("Failed to fetch dropdown options");
        }
        const { tables } = await response.json();
        // Filter out "candidate" and "interview" options
        const filteredOptions = tables.filter(
          (option) => option !== "candidate" && option !== "interview"
        );
        setDropdownOptions(
          filteredOptions.map((option) => ({ label: option, value: option }))
        );

        // Select the first option by default
        if (filteredOptions.length > 0) {
          setSelectedOption(filteredOptions[0]);
        }
      } catch (error) {
        console.error("Error fetching dropdown options:", error);
      }
    };

    fetchDropdownOptions();
  }, []);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const capitalizedOption =
          selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);
        const response = await fetch(`${apiUrl}/${capitalizedOption}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [apiUrl, selectedOption]);

  return (
    <div className="card" style={cardStyle}>
      <div className="card-header">
        <h1 className="title">{title}</h1>
        {showDropdown && (
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            style={{ color: "black" }}
          >
            <option value="">Select an option</option>
            {/* Render dropdown options dynamically */}
            {dropdownOptions.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label.charAt(0).toUpperCase() + option.label.slice(1)}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="card-body">
        <h2 className="number">{datas ? datas[0].count : ""}</h2>
      </div>
    </div>
  );
};

export default PersonalHigh;
