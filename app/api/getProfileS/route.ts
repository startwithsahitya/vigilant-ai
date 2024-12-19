// /api/getProfile.ts
import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/mysql';  // Assuming you have this query function setup

// Fetch the user profile based on the email
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    // Query the database to fetch the user profile
    const result = await query(
      'SELECT name, registration_number, profile_picture FROM students WHERE email = ?',
      [email]
    );

    // Check if the result is valid
    if (Array.isArray(result) && result.length > 0) {
      const user = result[0];
      return NextResponse.json({
        name: user.name,
        registrationNumber: user.registration_number,
        profilePicture: user.profile_picture,
      });
    }

    return NextResponse.json({ message: 'User not found' }, { status: 404 });
  } catch (error) {
    console.error('Error fetching profile data:', error);
    return NextResponse.json({ message: 'Error fetching profile data' }, { status: 500 });
  }
}
