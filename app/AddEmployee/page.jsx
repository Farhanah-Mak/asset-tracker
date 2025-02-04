"use client";

import { useState } from "react";
import "./AddEmployee.css"

export default function AddEmployee() {
  const [form, setForm] = useState({ name: "", employee_id: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/addEmployee", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Employee added successfully");
      setForm({ name: "", employee_id: "", location: "" });
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="form-container">
      <h1>Add Employee</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Employee ID</label>
          <input
            type="number"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label>Location</label>
          <select
            name="assetType"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            required
          >
            <option value="">Select Location</option>
            <option value="Headquarter">Headquarter</option>
            <option value="Sites">Sites</option>
            <option value="Factory">Factory</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit" className="submit-btn">
          Add Employee
        </button>
      </form>
    </div>
  );
}
