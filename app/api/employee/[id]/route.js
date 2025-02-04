import { NextResponse } from "next/server";
import { connectDb } from "@/database/db";
import Employee from "@/models/Employee";

export async function GET(request, { params }) {
  await connectDb();

  try {
    // Find the employee by employee_id and populate the assets
    const employee = await Employee.findOne({
      employee_id: params.id,
    }).populate({
      path: "assets", // This ensures assets are populated
      model: "Asset", // Ensure the correct model is used
      options: { strictPopulate: false }, // This makes sure it works if no assets are present
    });

    // If employee is not found, return a 404 response
    if (!employee) {
      return new NextResponse(JSON.stringify({ error: "Employee not found" }), {
        status: 404,
      });
    }

    // Return the employee with or without assets (empty assets array if no assets)
    return new NextResponse(JSON.stringify(employee), { status: 200 });
  } catch (error) {
    // Handle any errors and return a 500 response with the error message
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
