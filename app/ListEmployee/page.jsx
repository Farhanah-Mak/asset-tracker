// "use client";

// import { useState } from "react";
// import EmployeeList from "../components/EmployeeList";

// export default function LocationsPage() {
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [employees, setEmployees] = useState([]);

//   const locations = ["Headquarter", "Factory", "Sites", "Other"];

//   const handleLocationClick = async (location) => {
//     setSelectedLocation(location);

//     // Fetch employees by location dynamically
//     const response = await fetch(`/api/listEmployee?location=${location}`);
//     const data = await response.json();
//     setEmployees(data);
//   };

//   // onEmployeesUpdate function to update employees in parent
//   const onEmployeesUpdate = (updatedEmployees) => {
//     setEmployees(updatedEmployees);
//   };

//   return (
//     <div className="location-container">
//       <h1>Select Location</h1>
//       {locations.map((location) => (
//         <button key={location} onClick={() => handleLocationClick(location)}>
//           {location}
//         </button>
//       ))}
//       {selectedLocation && (
//         <div>
//           <h2>Employees in {selectedLocation}</h2>
//           {/* Pass the onEmployeesUpdate callback to EmployeeList */}
//           <EmployeeList
//             employees={employees}
//             onEmployeesUpdate={onEmployeesUpdate}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

"use client";
import "./LocationsPage.css"
import Link from "next/link";

export default function LocationsPage() {
  const locations = ["Headquarter", "Factory", "Sites", "Other"];

  return (
    <div className="location-container">
      <h2 className="location-title">Select The Location</h2>
      {locations.map((location) => (
        <Link href={`/ListEmployee/${location}`} key={location}>
          <button className="location-btn">{location}</button>
        </Link>
      ))}
    </div>
  );
}