import { NextRequest, NextResponse } from 'next/server';
import { query } from "@/app/lib/mysql"; // MySQL query function

// Handle POST request to submit a test attempt
export async function POST(req: NextRequest) {
    try {
        const { studentEmail, testName, teacherEmail } = await req.json(); // Get the request body data

        // Validate inputs
        if (!studentEmail || !testName || !teacherEmail) {
            return NextResponse.json({ message: 'Student Email, Test Name, and Teacher Email are required.' }, { status: 400 });
        }

        // Check if the student exists in the 'students' table
        const studentResults = await query('SELECT id FROM students WHERE email = ?', [studentEmail]);

        if (Array.isArray(studentResults) && studentResults.length > 0) {
            const student = studentResults[0]; // Access the first student record

            // Check if the teacher exists in the 'teachers' table
            const teacherResults = await query('SELECT id FROM teachers WHERE email = ?', [teacherEmail]);

            if (Array.isArray(teacherResults) && teacherResults.length > 0) {
                const teacher = teacherResults[0]; // Access the first teacher record

                // Insert the test attempt into the 'TestAttempts' table with the teacher's ID
                await query(
                    'INSERT INTO TestAttempts (student_id, test_name, teacher_id, test_attempt, result) VALUES (?, ?, ?, 1, NULL)',
                    [studentEmail, testName, teacherEmail]
                );

                // Respond with success message
                return NextResponse.json({ message: 'Test Given successfully!' });
            } else {
                return NextResponse.json({ message: 'Teacher not found.' }, { status: 404 });
            }
        } else {
            return NextResponse.json({ message: 'Student not found.' }, { status: 404 });
        }
    } catch (error) {
        console.error('Error handling test attempt:', error);
        return NextResponse.json({ message: 'An error occurred while submitting the test attempt.' }, { status: 500 });
    }
}
