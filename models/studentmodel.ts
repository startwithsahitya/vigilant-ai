import mongoose, { Schema, Document, Model } from "mongoose";
import { IStudent } from "./usertypesmodel"; // Import IStudent interface

// Mongoose schema definition
const studentSchema = new Schema<IStudent & Document>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Student", // Explicitly set the role for students
  },
  name: {
    type: String,
    required: false,
  },
  
});

// Create and Export the Student Model
const Student = mongoose.model<IStudent & Document>("Student", studentSchema);

export default Student;
