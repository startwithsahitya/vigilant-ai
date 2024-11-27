// /api/user/profile/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getUserProfile, updateUserProfile } from '@/lib/db'; // Function imports from db.ts
import { authenticateUser } from '@/utils/authUtils';  // Firebase Admin function to check user token

// Fetch user profile
export async function GET(req: NextRequest) {
  try {
    const userId = await authenticateUser(req);  // Extract the user ID from the request
    const profile = await getUserProfile(userId);  // Get profile from Firestore
    return NextResponse.json(profile);
  } catch (error) {
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: 'Unable to fetch user profile' }, { status: 500 });
  }
}

// Update user profile
export async function POST(req: NextRequest) {
  const userId = await authenticateUser(req);
  const { name, email, bio } = await req.json();  // Get the profile data from the request

  try {
    const updatedProfile = await updateUserProfile(userId, { name, email, bio });
    return NextResponse.json(updatedProfile);
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ error: 'Unable to update profile' }, { status: 500 });
  }
}
