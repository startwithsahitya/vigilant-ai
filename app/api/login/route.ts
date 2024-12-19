import bcrypt from 'bcryptjs';
import { query } from '../../lib/mysql';
import { RowDataPacket } from 'mysql2';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'; 

const JWT_SECRET = process.env.JWT_SECRET || 'your-jwt-secret'; 

export async function POST(req: Request) {
  try {
    const { email, password, role } = await req.json();

    if (!email || !password || !role) {
      return NextResponse.json({ error: 'Email, password, and role are required.' }, { status: 400 });
    }

    if (role !== 'student' && role !== 'teacher') {
      return NextResponse.json({ error: 'Invalid role. Must be either student or teacher.' }, { status: 400 });
    }

    // Define the table based on the role
    const table = role === 'student' ? 'students' : 'teachers';

    // Fetch the user data from the corresponding table
    const result = await query(`SELECT * FROM ${table} WHERE email = ?`, [email]);
    const users = result as RowDataPacket[];
    const user = users[0];

    if (!user) {
      return NextResponse.json({ error: 'User not found.' }, { status: 404 });
    }

    // Validate the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid password.' }, { status: 401 });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email, role, name: user.name || 'User' },
      JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Fetch additional profile data (name, registration number, and profile picture)
    const userProfile = {
      name: user.name,
      registrationNumber: user.registrationNumber,
      profilePicture: user.profilePicture,
    };

    // Return the response with token and profile data
    return NextResponse.json({
      message: 'Login successful',
      token,
      userProfile, // Add profile data here
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal Server Error. Please try again later.' }, { status: 500 });
  }
}
