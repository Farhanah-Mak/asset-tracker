
import { connectDb } from "@/database/db";
import Employee from "@/models/Employee";
import Asset from "@/models/Asset";

export async function GET(request) {
  await connectDb(); // Ensure connection to MongoDB

  // Get the URL and search parameters
  const url = new URL(request.url);
  const location = url.searchParams.get("location");

  try {
    // Set filter based on location if provided
    const filter = location ? { location } : {};

    // Fetch employees based on filter and populate their assets
    const employees = await Employee.find(filter).populate({
      path: "assets",
      model: Asset, // Specify the model for population
      options: { strictPopulate: false }, // Prevent errors if no assets are found
    });

    // Return the filtered employees (with populated assets)
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