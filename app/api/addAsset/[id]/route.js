// import { connectDb } from "@/database/db";
// import Asset from "@/models/Asset";
// import Employee from "@/models/Employee";

// // PATCH route for updating asset
// export async function PATCH(request, { params }) {
//   await connectDb();
//   const body = await request.json();

//   try {
//     const updatedAsset = await Asset.findByIdAndUpdate(params.id, body, {
//       new: true,
//     });
//     if (!updatedAsset) {
//       return new NextResponse(JSON.stringify({ error: "Asset not found" }), {
//         status: 404,
//       });
//     }
//     return new NextResponse(JSON.stringify(updatedAsset), { status: 200 });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: error.message }), {
//       status: 500,
//     });
//   }
// }

// DELETE route for un-assigning (removing) the asset from an employee
export async function DELETE(request, { params }) {
  await connectDb();

  try {
    // Find the asset by ID
    const asset = await Asset.findById(params.id);
    if (!asset) {
      return new Response(JSON.stringify({ error: "Asset not found" }), {
        status: 404,
      });
    }

    // Remove the asset from the employee's assets array
    await Employee.findByIdAndUpdate(asset.assignedTo, {
      $pull: { assets: asset._id },
    });

    // Optionally, delete the asset from the database
    await asset.remove();

    return new Response(
      JSON.stringify({ message: "Asset unassigned successfully" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
