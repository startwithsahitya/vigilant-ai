import { query } from "@/app/lib/mysql"; 
import { NextRequest, NextResponse } from "next/server";
import { RowDataPacket } from "mysql2";

export async function POST(req: NextRequest) {
  const { studentId, testName } = await req.json();

  if (!studentId || !testName) {
    return NextResponse.json({ message: "Student ID and Test Name are required." }, { status: 400 });
  }

  // Explicitly asserting the result as an array of RowDataPacket
  const result = (await query(
    "SELECT test_attempt FROM testattempts WHERE student_id = ? AND test_name = ?",
    [studentId, testName]
  )) as RowDataPacket[];

  if (result.length > 0 && result[0].test_attempt > 0) {
    return NextResponse.json({ message: "Test already submitted." }, { status: 403 });
  }

  return NextResponse.json({ message: "Eligible to take the test." });
}
