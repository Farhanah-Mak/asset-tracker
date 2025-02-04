"use client";

import React, { useState, useEffect, Suspense } from "react";
import AddAssetForm from "./AddAssetForm";
import SearchBar from "./SearchBar";
import "./EmployeeList.css";

export default function EmployeeList({ employees, onEmployeesUpdate }) {
  const [filteredEmployees, setFilteredEmployees] = useState(employees);
  const [editMode, setEditMode] = useState(null); // Track the asset being edited
  const [editData, setEditData] = useState({}); // Track changes to the asset
  const [showModal, setShowModal] = useState(false); // Modal visibility for adding new asset
  const [currentEmployee, setCurrentEmployee] = useState(null); // The employee for whom asset is being added
const [expandedEmployeeId, setExpandedEmployeeId] = useState(null);

const toggleExpand = (employeeId) => {
  setExpandedEmployeeId((prev) => (prev === employeeId ? null : employeeId));
};

  const [newAssetData, setNewAssetData] = useState({
    assetType: "",
    model: "",
    serialNumber: "",
    status: "active",
    startDate: "",
  });

  useEffect(() => {
    setFilteredEmployees(employees);
  }, [employees]);

  const updateEmployeeLists = (updatedEmployees) => {
    onEmployeesUpdate(updatedEmployees);
    setFilteredEmployees(updatedEmployees);
  };

  const handleEdit = (asset) => {
    setEditMode(asset._id);
     setEditData({
       assetType: asset.assetType,
       model: asset.model,
       serialNumber: asset.serialNumber,
       status: asset.status,
       startDate: asset.startDate,
     });
  };

  const handleCancel = () => {
    setEditMode(null);
    setEditData({});
  };

  const handleSave = async (assetId) => {
    try {
      const res = await fetch(`/api/assets/${assetId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      const updatedAsset = await res.json();
      if (res.ok) {
        alert("Asset status updated successfully!");
        const updatedEmployees = employees.map((employee) => ({
          ...employee,
          assets: employee.assets.map((asset) =>
            asset._id === assetId ? updatedAsset : asset
          ),
        }));

        updateEmployeeLists(updatedEmployees);
        setEditMode(null);
      } else {
        console.error("Error updating asset:", updatedAsset.error);
      }
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };

  const handleUnassign = async (assetId) => {
    if (!confirm("Are you sure you want to un-assign this asset?")) return;

    try {
      const res = await fetch(`/api/assets/${assetId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        const updatedEmployees = employees.map((employee) => ({
          ...employee,
          assets: employee?.assets?.filter((asset) => asset._id !== assetId),
        }));

        updateEmployeeLists(updatedEmployees);
        alert("Asset unassigned successfully!");
      } else {
        const data = await res.json();
        console.error("Error un-assigning asset:", data.error);
      }
    } catch (error) {
      console.error("Error un-assigning asset:", error);
    }
  };

  const handleStatusChange = (e) => {
    setEditData({ ...editData, status: e.target.value });
  };

  const handleAddModalOpen = (employee) => {
    setCurrentEmployee(employee);
    setShowModal(true);
  };

  const handleAddModalClose = () => {
    setShowModal(false);
    setCurrentEmployee(null);
    setNewAssetData({
      assetType: "",
      model: "",
      serialNumber: "",
      status: "active",
      startDate: "",
    });
  };

  const handleAddAsset = async () => {
    if (!currentEmployee) return;

    try {
      const res = await fetch("/api/assets", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newAssetData,
          assignedTo: currentEmployee._id,
        }),
      });

      const newAsset = await res.json();
      if (res.ok) {
        alert("Asset added successfully!");

        const updatedEmployees = employees.map((employee) =>
          employee._id === currentEmployee._id
            ? { ...employee, assets: [...employee.assets, newAsset] }
            : employee
        );

        updateEmployeeLists(updatedEmployees);
        handleAddModalClose();
      } else {
        console.error("Error adding asset:", newAsset.error);
      }
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const calculateDuration = (startDate) => {
    const start = new Date(startDate);
    const now = new Date();
    return `${
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth())
    } month(s)`;
  };

  const handleSearch = (searchTerm) => {
    if (!searchTerm) {
      setFilteredEmployees(employees);
    } else {
      const filtered = employees.filter((employee) =>
        employee.employee_id.toString().includes(searchTerm)
      );
      setFilteredEmployees(filtered);
    }
  };

  const handleInputChange = (e, field) => {
    setEditData({ ...editData, [field]: e.target.value });
  };

  return (
    <div className="container">
      <SearchBar onSearch={handleSearch} />
      <table className="table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Assigned Assets</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
            {/* {loading && <tr><td colSpan="4">Loading...</td></tr>} */}
            {filteredEmployees?.length === 0 && (
              <tr>
                <td colSpan="4">No employees found.</td>
              </tr>
            )}
             {filteredEmployees?.map((employee) => (
            <tr key={employee._id}>
              <td>{employee.employee_id}</td>
              <td>{employee.name}</td>
              <td>
                {employee?.assets?.length > 0 ? (
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Asset Type</th>
                        <th>Model</th>
                        <th>Serial Number</th>
                        <th>Status</th>
                        <th>Start Date</th>
                        <th>Duration</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>

                        {employee.assets.map((asset) => (
                          <tr key={asset?._id}>
                            <td>
                              {" "}
                              {editMode === asset._id ? (
                                <input
                                  type="text"
                                  value={editData.assetType}
                                  onChange={(e) =>
                                    handleInputChange(e, "assetType")
                                  }
                                />
                              ) : (
                                asset?.assetType
                              )}
                            </td>
                            <td>
                              {" "}
                              {editMode === asset._id ? (
                                <input
                                  type="text"
                                  value={editData.model}
                                  onChange={(e) =>
                                    handleInputChange(e, "model")
                                  }
                                />
                              ) : (
                                asset?.model
                              )}
                            </td>
                            <td>
                              {" "}
                              {editMode === asset._id ? (
                                <input
                                  type="text"
                                  value={editData.serialNumber}
                                  onChange={(e) =>
                                    handleInputChange(e, "serialNumber")
                                  }
                                />
                              ) : (
                                asset?.serialNumber
                              )}
                            </td>
                            <td>
                              {editMode === asset._id ? (
                                <select
                                  value={editData.status}
                                  onChange={(e) =>
                                    handleInputChange(e, "status")
                                  }
                                >
                                  <option value="active">Active</option>
                                  <option value="awaiting resource">
                                    Awaiting Resource
                                  </option>
                                  <option value="canceled">Canceled</option>
                                  <option value="completed">Completed</option>
                                </select>
                              ) : (
                                asset?.status
                              )}
                            </td>
                            <td>
                              {" "}
                              {editMode === asset._id ? (
                                <input
                                  type="date"
                                  value={editData.startDate.split("T")[0]}
                                  onChange={(e) =>
                                    handleInputChange(e, "startDate")
                                  }
                                />
                              ) : (
                                asset?.startDate?.split("T")[0]
                              )}
                            </td>
                            <td>{calculateDuration(asset.startDate)}</td>
                            <td>
                              {editMode === asset._id ? (
                                <div className="btn-group">
                                  <button
                                    onClick={() => handleSave(asset._id)}
                                  >
                                    Update
                                  </button>
                                  <button
                                    className="cancel"
                                    onClick={handleCancel}
                                  >
                                    Cancel
                                  </button>
                                </div>
                              ) : (
                                   <div className="btn-group">
                                <button
                                  onClick={() => handleEdit(asset)}
                                  title="Edit"
                                >
                                  {/* <img src="/edit.svg" alt="Edit" width="24" height="24"/> */}
                                  <svg
                                    fill="#fff"
                                    width="14"
                                    height="14"
                                    viewBox="0 0 1920 1920"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M277.974 49.076c65.267-65.379 171.733-65.49 237.448 0l232.186 232.187 1055.697 1055.809L1919.958 1920l-582.928-116.653-950.128-950.015 79.15-79.15 801.792 801.68 307.977-307.976-907.362-907.474L281.22 747.65 49.034 515.464c-65.379-65.603-65.379-172.069 0-237.448Zm1376.996 1297.96-307.977 307.976 45.117 45.116 384.999 77.023-77.023-385-45.116-45.116ZM675.355 596.258l692.304 692.304-79.149 79.15-692.304-692.305 79.149-79.15ZM396.642 111.88c-14.33 0-28.547 5.374-39.519 16.345l-228.94 228.94c-21.718 21.718-21.718 57.318 0 79.149l153.038 153.037 308.089-308.09-153.037-153.036c-10.972-10.971-25.301-16.345-39.63-16.345Z"
                                      fill-rule="evenodd"
                                    />
                                  </svg>
                                </button>
                                <button
                                  className="cancel"
                                  onClick={() => handleUnassign(asset._id)}
                                >
                                  Un-assign
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  "No assets assigned"
                )}
              </td>
              <td>
                <button onClick={() => handleAddModalOpen(employee)}>
                  Assign Asset
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <div className="modal">
          <div className="modalContent">
            <h3>Assign Asset for {currentEmployee?.name}</h3>
            <AddAssetForm
              formData={newAssetData}
              setFormData={setNewAssetData}
              onSubmit={handleAddAsset}
              showEmployeeSelect={false}
            />
            <button className="cancel-btn" onClick={handleAddModalClose}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
