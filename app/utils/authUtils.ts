import { RowDataPacket } from "mysql2";
import { query } from "../lib/mysql"; // Adjust path to your query utility

export const getUserByEmailAndRole = async (email: string, role: string) => {
  const table = role === "student" ? "students" : "teachers";

  try {
    // Execute query and assert result as RowDataPacket[]
    const results = (await query(
      `SELECT * FROM ${table} WHERE email = ? LIMIT 1`,
      [email]
    )) as RowDataPacket[];

    if (results.length > 0) {
      return results[0]; // Safely access the first row
    }

    return null; // No user found
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
