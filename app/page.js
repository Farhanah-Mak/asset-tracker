"use client";
import React from "react";

const HomePage = () => {
  return (
    <div className="homepage">
      <h1 className="homepage_title">Employee Asset Tracker</h1>
      <p className="homepage_description">
        Welcome to Employee Assets Tracker Application. This application helps to track the assets assigned to employees in the company.
        <br />
        <br />
        1. Search Employee helps you to search the employee ID and
        retrieve all the informtion about that employee.
        <br />
        <br />
        2. Employee List displays the employees along with their assigned
        assets filtered based on their location.The Location can be either
        headquarters, factory, sites or others. The details are dispalyed in a
        tabular form.we can edit, un-assign or delete assets from here
        rightaway.
        <br />
        <br />
        3. Add Employee page adds new employee into the databse with
        thier employee ID and location.The Location can be either headquarters,
        factory, sites or others.
        <br />
        <br />
        4. Assign Assets page and has a form that can be used to assign
        assets to the employees. A dropdown menu of assets are available to
        choose. Serial number and Model number of the asset needs to be added
        manually along with the assigned date.
      </p>
    </div>
  );
};

export default HomePage;
