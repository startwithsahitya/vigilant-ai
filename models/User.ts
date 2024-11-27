import { Schema, model, models } from "mongoose";

// Define user schema
const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Student", "Teacher"], // You can add more roles if needed
      default: "Student",
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create the model if it doesn't exist yet
const User = models.User || model("User", userSchema);

export default User;
