import { NextResponse } from "next/server";
import { query } from "@/app/lib/mysql"; // Import the query function from mysql.ts
import { RowDataPacket } from "mysql2"; // Correct import for RowDataPacket

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email parameter is required.' }, { status: 400 });
  }

  try {
    // Query to fetch assigned tests from `testattempts` table where student_id is the provided email
    const rows = await query(
      `
      SELECT ta.teacher_id, ta.test_name
      FROM testattempts ta
      WHERE ta.student_id = ? AND ta.test_attempt = 1
      `,
      [email]
    ) as RowDataPacket[]; // Type the result as RowDataPacket[]

    console.log("Fetched assigned test rows:", rows);  // Debugging

    if (rows.length === 0) {
      return NextResponse.json({ tests: [] });
    }

    return NextResponse.json({ tests: rows });
  } catch (error) {
    console.error('Error fetching assigned tests:', error);
    return NextResponse.json({ message: 'An error occurred while fetching assigned tests.' }, { status: 500 });
  }
}
