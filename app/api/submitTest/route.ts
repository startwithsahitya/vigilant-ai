import { NextResponse } from "next/server";
import { query } from "@/app/lib/mysql";
import { OkPacket } from "mysql2";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { testName, totalScore } = body;

    if (!testName || typeof totalScore !== "number") {
      return NextResponse.json(
        { message: "Invalid or missing required fields: testName or totalScore." },
        { status: 400 }
      );
    }

    // Check if the test_name exists in the testattempts table
    const rows = await query("SELECT * FROM testattempts WHERE test_name = ?", [testName]);

    if (Array.isArray(rows) && rows.length > 0) {
      // If the test_name exists, update the total_score and reset test_attempt
      const updateResult = await query(
        "UPDATE testattempts SET result = ?, test_attempt = NULL WHERE test_name = ?",
        [totalScore, testName]
      );

      const okPacket = updateResult as OkPacket;

      if (okPacket.affectedRows > 0) {
        return NextResponse.json(
          { message: "Test score submitted successfully." },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { message: "Failed to update the test score." },
          { status: 500 }
        );
      }
    } else {
      return NextResponse.json(
        { message: "Test not found." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error in submitting test score:", error);
    return NextResponse.json(
      { message: "An error occurred while submitting the test score." },
      { status: 500 }
    );
  }
}
