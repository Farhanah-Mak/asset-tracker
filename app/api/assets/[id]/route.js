import { connectDb } from "@/database/db";
import Asset from "@/models/Asset";
import Employee from "@/models/Employee";
import { NextResponse } from "next/server";

// PATCH route for updating asset
export async function PATCH(request, { params }) {
  console.log("PATCH request received for asset ID:", params.id);
  await connectDb();
  const body = await request.json();
  console.log("Request body:", body);

  try {
    const updatedAsset = await Asset.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    if (!updatedAsset) {
      console.log("Asset not found with ID:", params.id);
      return new NextResponse(JSON.stringify({ error: "Asset not found" }), {
        status: 404,
      });
    }
    console.log("Asset updated successfully:", updatedAsset);
    return new NextResponse(JSON.stringify(updatedAsset), { status: 200 });
  } catch (error) {
    console.error("Error updating asset:", error.message);
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}

// DELETE route for un-assigning (removing) the asset from an employee
export async function DELETE(request, { params }) {
  await connectDb();

  try {
    // Find the asset by ID
    const asset = await Asset.findById(params.id);
    if (!asset) {
      return new NextResponse(JSON.stringify({ error: "Asset not found" }), {
        status: 404,
      });
    }

    // Remove the asset from the employee's assets array
    await Employee.findByIdAndUpdate(asset.assignedTo, {
      $pull: { assets: asset._id },
    });

    // Use deleteOne to delete the asset from the database
    await asset.deleteOne();

    return new NextResponse(
      JSON.stringify({ message: "Asset unassigned successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
