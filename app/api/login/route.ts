import bcrypt from 'bcryptjs';
import { query } from '../../lib/mysql';
import { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; // Import JWT for token creation

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret'; // Secret key for signing the token

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    // 1. Validate required fields
    if (!email || !password || !role) {
      return NextResponse.json(
        { error: 'Email, password, and role are required.' },
        { status: 400 }
      );
    }

    // 2. Validate role
    if (role !== 'student' && role !== 'teacher') {
      return NextResponse.json(
        { error: 'Invalid role. Must be either student or teacher.' },
        { status: 400 }
      );
    }

    const table = role === 'student' ? 'students' : 'teachers';

    // 3. Fetch user from MySQL
    const result = await query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
    const users = result as RowDataPacket[];
    const user = users[0];

    // 4. Check if user exists
    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // 5. Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid password.' },
        { status: 401 }
      );
    }

    // 6. Generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role: role,
        name: user.name || 'User',
      },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration time (1 hour in this case)
    );

    // 7. Send success response with token
    return NextResponse.json({
      message: 'Login successful',
      token: token, // Send the JWT token in the response
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error. Please try again later.' },
      { status: 500 }
    );
  }
}
