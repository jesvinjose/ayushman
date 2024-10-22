const mongoose = require("mongoose");

const consultantSchema = mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    qualification: {
      type: String,
      required: true,
    },
    availableDays:{
      type: [String], // Change to an array of strings
      required:true,
      enum: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ], // Add all available days
    },
    availableTiming:{
      type:String,
      required:true
    }
  },
  {
    timestamps: true, // Automatically creates `createdAt` and `updatedAt` fields
  }
);

const Consultant = mongoose.model("Consultant", consultantSchema);
module.exports = Consultant;
