// "use client";

// import { useState, useEffect } from "react";
// import "./AddAsset.css";

// export default function AssignAsset() {
//   const [form, setForm] = useState({
//     assetType: "",
//     model: "",
//     serialNumber: "",
//     assignedTo: "",
//     startDate: "",
//     status: "",
//   });

//   const [employees, setEmployees] = useState([]);

//   useEffect(() => {
//     // Fetch the list of employees to populate the "assignedTo" field
//     async function fetchEmployees() {
//       const res = await fetch("/api/listEmployee");
//       const data = await res.json();
//       if (res.ok) {
//         setEmployees(data);
//       } else {
//         console.error("Error fetching employees:", data.error);
//       }
//     }

//     fetchEmployees();
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const res = await fetch("/api/assets", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });

//     const data = await res.json();
//     if (res.ok) {
//       alert("Asset added successfully!");
//       setForm({
//         assetType: "",
//         model: "",
//         serialNumber: "",
//         assignedTo: "",
//         startDate: "",
//         status: "",
//       });
//     } else {
//       alert("Error: " + data.error);
//     }
//   };

//   return (
//     <>
//       <div className="form-container">
//         <h1 className="title">Assign Asset</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="form-group">
//             <label>Asset Type</label>
//             <select
//               value={form.assetType}
//               onChange={(e) => setForm({ ...form, assetType: e.target.value })}
//               required
//             >
//               <option value="">Select Asset Type</option>
//               <option value="SIM Card">SIM Card</option>
//               <option value="Laptop">Laptop</option>
//               <option value="Display">Display</option>
//               <option value="Other">Other</option>
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Model</label>
//             <input
//               type="text"
//               value={form.model}
//               onChange={(e) => setForm({ ...form, model: e.target.value })}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Serial Number</label>
//             <input
//               type="text"
//               value={form.serialNumber}
//               onChange={(e) =>
//                 setForm({ ...form, serialNumber: e.target.value })
//               }
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Assign to Employee</label>
//             <select
//               value={form.assignedTo}
//               onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
//               required
//             >
//               <option value="">Select Employee</option>
//               {employees.map((employee) => (
//                 <option key={employee._id} value={employee._id}>
//                   {employee.name} (ID: {employee.employee_id})
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="form-group">
//             <label>Start Date:</label>
//             <input
//               type="date"
//               value={form.startDate}
//               onChange={(e) => setForm({ ...form, startDate: e.target.value })}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Status</label>
//             <select
//               value={form.status}
//               onChange={(e) => setForm({ ...form, status: e.target.value })}
//               required
//             >
//               <option value="">Select Status</option>
//               <option value="active">Active</option>
//               <option value="awaiting resource">Awaiting Resource</option>
//               <option value="canceled">Canceled</option>
//               <option value="completed">Completed</option>
//             </select>
//           </div>
//           <button type="submit" className="submit-btn">
//             Assign Asset
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }


"use client";
import { useState } from "react";
import AddAssetForm from "../components/AddAssetForm"; // Import the reusable form component
import "./AddAsset.css"

export default function AssignAsset() {
  const [form, setForm] = useState({
    assetType: "",
    model: "",
    serialNumber: "",
    assignedTo: "",
    startDate: "",
    status: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/assets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      alert("Asset assigned successfully!");
      setForm({
        assetType: "",
        model: "",
        serialNumber: "",
        assignedTo: "",
        startDate: "",
        status: "",
      });
    } else {
      alert("Error: " + data.error);
    }
  };

  return (
    <div className="form-container">
      <h1 className="title">Assign Assets</h1>
      <AddAssetForm
        formData={form}
        setFormData={setForm}
        onSubmit={handleSubmit}
        showEmployeeSelect={true} // Show employee dropdown for this page
      />
    </div>
  );
}