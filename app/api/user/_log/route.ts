// /api/user/_log/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { logUserAction } from '@/lib/db';  // Function to log actions

export async function POST(req: NextRequest) {
  const { action, userId, details } = await req.json();  // Extract action details from request

  try {
    await logUserAction(userId, action, details);  // Log the action in Firestore
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error logging user action:', error);
    return NextResponse.json({ error: 'Unable to log user action' }, { status: 500 });
  }
}
