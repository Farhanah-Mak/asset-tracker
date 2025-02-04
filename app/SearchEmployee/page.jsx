"use client";

import { useState } from "react";
import "./SearchEmployee.css"
export default function SearchEmployee() {
  const [employeeId, setEmployeeId] = useState("");
  const [employeeData, setEmployeeData] = useState(null);
  const [message, setMessage] = useState(null);

  const handleSearch = async () => {
    const res = await fetch(`/api/employee/${employeeId}`);
    const data = await res.json();

    if (res.ok) {
      setEmployeeData(data);
      if(data.assets.length === 0){
        setMessage("No assets found for this employee")
      }
    } else {
      alert("Error: " + data.error);
    }
  };

 

  return (
    <div className="container">
      <h2>Search Employee by ID</h2>

      <div className="searchSection">
        <label>Employee ID</label>
        <input
          type="number"
          value={employeeId}
          onChange={(e) => setEmployeeId(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {employeeData && (
        <table className="asset-details">
          <h3 className="name">
            {" "}
            Employee Name: <span className="employee-name">{employeeData?.name}</span>
          </h3>
          <table className="table">
            <thead>
              <tr>
                <th>Asset Type </th>
                <th>Model </th>
                <th>Serial Number </th>
                <th>Status</th>
                <th>Start Date</th>
              </tr>
            </thead>
            <tbody>
              {/* Map through the assets array and display the data in the table */}
              {employeeData?.assets?.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    {message}
                  </td>
                </tr>
              ) : (
                employeeData?.assets?.map((asset, index) => (
                  <tr key={index}>
                    <td>{asset?.assetType}</td>
                    <td>{asset?.model}</td>
                    <td>{asset?.serialNumber}</td>
                    <td>{asset?.status}</td>
                    <td>{new Date(asset?.startDate).toLocaleDateString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </table>
      )}
    </div>
  );
}
