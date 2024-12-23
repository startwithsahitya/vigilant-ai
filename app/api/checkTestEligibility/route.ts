import { NextResponse } from 'next/server';
import { query } from '@/app/lib/mysql'; // Import the query function from mysql.ts
import type { RowDataPacket } from 'mysql2/promise'; // Import RowDataPacket for type checking

// API handler for checking test eligibility
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url); // Extract searchParams from URL
  const email = searchParams.get('email');  // Get the email query parameter

  // Check if the email parameter is provided
  if (!email) {
    return NextResponse.json(
      { message: 'Email parameter is required.' },
      { status: 400 }
    );
  }

  try {
    // Query to check eligibility by joining `students` and `testattempts` tables
    const rows = await query(
      `
      SELECT ta.test_attempt 
      FROM testattempts ta
      INNER JOIN students s ON ta.student_id = s.id
      WHERE s.email = ? AND ta.test_attempt = 1
      `,
      [email]
    ) as RowDataPacket[]; // Assert that the result is RowDataPacket[]

    // If there are rows, it means the student is eligible
    if (rows.length > 0) {
      return NextResponse.json({
        message: 'Yes',
        testPageUrl: '/dashboard/student/Taketest', // Provide the test page URL
      });
    } else {
      return NextResponse.json({ message: 'No' }); // Not eligible
    }
  } catch (error) {
    console.error('Error checking eligibility:', error);
    return NextResponse.json(
      { message: 'An error occurred while checking test attempt.' },
      { status: 500 }
    );
  }
}
