// app/api/checkTestAttempt/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from "@/app/lib/mysql"; // MySQL query function

// Handle GET request to check if the student is eligible to attempt the test
export async function GET(req: NextRequest) {
    // Access query parameters from the URL
    const email = req.nextUrl.searchParams.get('email');

    if (!email) {
        return NextResponse.json({ message: 'Email is required.' }, { status: 400 });
    }

    try {
        // Step 1: Get student_id from the email (adjusted column name)
        const studentResult = await query(`
            SELECT id FROM students WHERE email = ?`, [email]);

        if (!Array.isArray(studentResult) || studentResult.length === 0) {
            return NextResponse.json({ message: 'Student not found.' }, { status: 404 });
        }

        const studentId = studentResult[0].id;

        // Step 2: Check if the student has a record in TestAttempts with test_attempt = 1
        const testAttemptResult = await query(`
            SELECT test_attempt FROM TestAttempts WHERE student_id = ? AND test_attempt = 1`, [studentId]);

        if (Array.isArray(testAttemptResult) && testAttemptResult.length > 0) {
            // If the student is eligible for the test (test_attempt = 1)
            return NextResponse.json({ message: 'Yes' });
        } else {
            // If no record is found or test_attempt is not 1
            return NextResponse.json({ message: 'No' });
        }

    } catch (error: unknown) {
        // Handle the error by checking its type
        if (error instanceof Error) {
            console.error('Error checking test attempt:', error.message); // Log the error message
            return NextResponse.json({ message: `An error occurred: ${error.message}` }, { status: 500 });
        } else {
            // If the error is not an instance of Error (unlikely, but possible)
            console.error('Unknown error occurred:', error);
            return NextResponse.json({ message: 'An unknown error occurred.' }, { status: 500 });
        }
    }
}
