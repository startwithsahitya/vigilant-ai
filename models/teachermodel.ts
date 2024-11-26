import mongoose, { Schema, Document } from "mongoose";
import { ITeacher } from "./usertypesmodel"; // Import ITeacher interface

const teacherSchema = new Schema<ITeacher & Document>({
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
    default: "Teacher", // Explicitly set the role for teachers
  },
  name: {
    type: String,
    required: false,
  },
 
});

// Create and Export the Teacher Model
const Teacher = mongoose.model<ITeacher & Document>("Teacher", teacherSchema);

export default Teacher;
