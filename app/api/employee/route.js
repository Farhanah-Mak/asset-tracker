

import { connectDb } from "@/database/db";
import Employee from "@/models/Employee";
import Asset from "@/models/Asset";

export async function GET(request) {
  await connectDb(); // Ensure you're connecting to your MongoDB database

  try {
    // Fetch employees and populate their assets (if any)
    const employees = await Employee.find().populate({
      path: "assets",
      model: Asset, // Specify the model for population
      options: { strictPopulate: false }, // Ensure it doesn't throw an error if assets are missing
    });

    // Return the employees (with or without assets)
    return new Response(JSON.stringify(employees), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    // Handle any errors that occur during the database query
    return new Response(
      JSON.stringify({
        error: "Failed to fetch employees",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
