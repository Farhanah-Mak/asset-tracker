import {connectDb } from "@/database/db";
import Employee from "@/models/Employee";
import { NextResponse } from "next/server";

export async function POST(request) {
  await connectDb();

  const body = await request.json();

  try {
    const newEmployee = new Employee(body);
    await newEmployee.save();
    return new NextResponse(JSON.stringify(newEmployee), { status: 201 });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: error.message }), {
      status: 400,
    });
  }
}