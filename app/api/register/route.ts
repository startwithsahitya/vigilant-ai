import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs'; // For password hashing
import { query } from '../../lib/mysql'; // Import the query function
import { RowDataPacket } from 'mysql2'; // Import RowDataPacket type from mysql2

export async function POST(req: Request) {
  try {
    const { email, password, selectedRole } = await req.json();

    // Validate the request body
    if (!email || !password || !selectedRole) {
      return NextResponse.json(
        { error: 'Please provide email, password, and role' },
        { status: 400 }
      );
    }

    // Validate the role (either 'student' or 'teacher')
    if (selectedRole !== 'student' && selectedRole !== 'teacher') {
      return NextResponse.json(
        { error: 'Invalid role. Must be either "student" or "teacher"' },
        { status: 400 }
      );
    }

    // Choose the table based on the role
    const table = selectedRole === 'student' ? 'students' : 'teachers';

    // Check if the email already exists in the corresponding table
    const queryResult = await query(`SELECT * FROM ${table} WHERE email = ?`, [email]);

    // Accessing rows directly from the result
    const rows = queryResult as any[];

    if (rows.length > 0) {
      return NextResponse.json(
        { error: 'Email already exists' },
        { status: 400 }
      );
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the new user into the correct table based on their role
    await query(
      `INSERT INTO ${table} (email, password) VALUES (?, ?)`,
      [email, hashedPassword]
    );

    // Success response
    return NextResponse.json({ message: 'Registration successful' }, { status: 200 });
  } catch (err) {
    console.error('Error during registration:', err);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
