import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  employee_id: { type: Number, required: true, unique: true },
  location: {
    type: String,
    enum: ["Headquarter", "Factory", "Sites", "Other"],
    required: true,
  },
  assets: [{ type: mongoose.Schema.Types.ObjectId, ref: "Asset", default: [] }], // Reference to assets
});

const Employee =
  mongoose.models.Employee || mongoose.model("Employee", EmployeeSchema);
export default Employee;
   