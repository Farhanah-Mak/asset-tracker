import mongoose from 'mongoose';

const AssetSchema = new mongoose.Schema({
  assetType: {
    type: String,
    enum: [
      "Fingerprint Devices",
      "PBX Devices",
      "Routers",
      "Computers",
      "Monitors",
      "Laptops",
      "Printers",
      "Scanners",
      "Cameras"
    ],
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  serialNumber: {
    type: String,
    required: true,
  },
  license: {
    type: String,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee", // Reference to Employee model
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["active", "awaiting resource", "canceled", "completed"],
    required: true,
  },
});

const Asset = mongoose.models.Asset || mongoose.model("Asset", AssetSchema);
export default Asset;
