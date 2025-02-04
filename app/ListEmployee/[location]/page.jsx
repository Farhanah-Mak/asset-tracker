'use client'
import { useEffect, useState, Suspense } from "react";
import EmployeeList from "@/app/components/EmployeeList";
import Link from "next/link";

import "../LocationsPage.css";

export default function LocationPage({ params }) {
  const { location } = params; // Get location from dynamic route params
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch(`/api/listEmployee?location=${location}`);
      const data = await response.json();
        setEmployees(data);
        console.log(location)
    };
    fetchEmployees();
  }, [location]);

  const onEmployeesUpdate = (updatedEmployees) => {
    setEmployees(updatedEmployees);
  };

  return (
    <div className="location-container">
      <Link href="/ListEmployee" className="back-link">
        Go back
      </Link>
      <h2>
        Employees in {location.charAt(0).toUpperCase() + location.slice(1)}
      </h2>
      <Suspense fallback={<p>Loading Users...</p>}>
        <EmployeeList
          employees={employees}
          onEmployeesUpdate={onEmployeesUpdate}
        />
      </Suspense>
    </div>
  );
}
