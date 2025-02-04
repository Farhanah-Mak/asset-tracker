// import { connectDb } from "@/database/db";
// import Asset from "@/models/Asset";
// import Employee from "@/models/Employee";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   await connectDb();
//   const body = await request.json();

//   try {
//     const newAsset = new Asset(body);
//     await newAsset.save();

//     // Update employee's assets list
//     await Employee.findByIdAndUpdate(body.assignedTo, {
//       $push: { assets: newAsset._id },
//     });

//     return new NextResponse(JSON.stringify(newAsset), { status: 201 });
//   } catch (error) {
//     return new NextResponse(JSON.stringify({ error: error.message }), {
//       status: 400,
//     });
//   }
// }
