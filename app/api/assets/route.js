import { connectDb } from "@/database/db";
import Asset from "@/models/Asset";
import Employee from "@/models/Employee";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDb();
  const body = await request.json();

  try {
    // Create and save the new asset
    const newAsset = new Asset(body);
    await newAsset.save();

    // Update the employee by pushing the new asset ID to the assets array
    // $push automatically handles adding the first asset even if the array is empty
    const updatedEmployee = await Employee.findByIdAndUpdate(
      body.assignedTo,
      { $push: { assets: newAsset._id } },
      { new: true, upsert: true } // upsert ensures it updates or inserts if the employee doesn't exist
    );

    // Return the newly created asset and updated employee
    return new NextResponse(JSON.stringify({ newAsset, updatedEmployee }), {
      status: 201,
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}
