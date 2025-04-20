'use client';
import { useEffect, useState } from "react";
import "./AddAssetForm.css";


const AddAssetForm = ({
  formData,
  setFormData,
  onSubmit,
  showEmployeeSelect = false,
}) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    if (showEmployeeSelect) {
      // Fetch the list of employees to populate the "assignedTo" field
      async function fetchEmployees() {
        const res = await fetch("/api/listEmployee");
        const data = await res.json();
        if (res.ok) {
          setEmployees(data);
        } else {
          console.error("Error fetching employees:", data.error);
        }
      }

      fetchEmployees();
    }
  }, [showEmployeeSelect]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label>Asset Type</label>
        <select
          name="assetType"
          value={formData.assetType}
          onChange={handleChange}
          required
        >
          <option value="">Select Asset Type</option>
          <option value="Fingerprint Devices">Fingerprint Devices</option>
          <option value="PBX Devices">PBX Devices</option>
          <option value="Routers">Routers</option>
          <option value="Computers">Computers</option>
          <option value="Monitors">Monitors</option>
          <option value="Laptops">Laptops</option>
          <option value="Printers">Printers</option>
          <option value="Scanner">Scanners</option>
          <option value="Cameras">Cameras</option>
        </select>
      </div>

      <div className="form-group">
        <label>Model</label>
        <input
          type="text"
          name="model"
          value={formData.model}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Serial Number</label>
        <input
          type="text"
          name="serialNumber"
          value={formData.serialNumber}
          onChange={handleChange}
          required
        />
      </div>

      {showEmployeeSelect && (
        <div className="form-group">
          <label>Assign to Employee</label>
          <select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={handleChange}
            required
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id} value={employee._id}>
                {employee.name} (ID: {employee.employee_id})
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Start Date</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          required
        >
          <option value="">Select Status</option>
          <option value="active">Active</option>
          <option value="awaiting resource">Awaiting Resource</option>
          <option value="canceled">Canceled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button type="submit" className="submit-btn">
        Assign Asset
      </button>
    </form>
  );
};

export default AddAssetForm;
