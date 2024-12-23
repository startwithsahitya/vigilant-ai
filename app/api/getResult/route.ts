import { NextRequest, NextResponse } from "next/server";
import { query } from "@/app/lib/mysql"; // Assuming query function is set up for DB interaction

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json(); // Get email from request body

    if (!email) {
      return NextResponse.json({ message: "Email is required." }, { status: 400 });
    }

    // Query to find all test attempts for the student where test_attempt is NULL
    const rows = await query(
      "SELECT * FROM testattempts WHERE student_id = ? AND test_attempt IS NULL",
      [email]
    );

    if (!Array.isArray(rows) || rows.length === 0) {
      return NextResponse.json({ message: "No test found or already attempted." }, { status: 404 });
    }

    // Prepare the results to be sent back as an array of test results
    const results = rows.map((row) => ({
      test_name: row.test_name,
      result: row.result,
      teacher_id: row.teacher_id,
      total_marks: 5, // Example total marks, replace with your actual value
    }));

    // Return all matching test attempts
    return NextResponse.json(results);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error occurred while fetching the result:", error.message);
      return NextResponse.json({ message: "An error occurred while fetching the result.", error: error.message }, { status: 500 });
    } else {
      console.error("Unknown error:", error);
      return NextResponse.json({ message: "An unknown error occurred." }, { status: 500 });
    }
  }
}
