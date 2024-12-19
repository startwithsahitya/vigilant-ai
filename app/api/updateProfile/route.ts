import { NextRequest, NextResponse } from 'next/server';
import { query } from '@/app/lib/mysql';

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();

    // Retrieve fields from the request body
    const name = body.get('name') as string | null;
    const registrationNumber = body.get('registrationNumber') as string | null;
    const mailId = body.get('mailId') as string | null;
    const profilePicture = body.get('profilePicture') as File | null;

    // Debugging: Log incoming data
    console.log('Received Data:', { name, registrationNumber, mailId, profilePicture });

    if (!mailId) {
      return NextResponse.json({ message: 'Email ID is required' }, { status: 400 });
    }

    // Build the update query dynamically based on provided fields
    const fieldsToUpdate: string[] = [];
    const valuesToUpdate: (string | null)[] = [];

    if (name) {
      fieldsToUpdate.push('name = ?');
      valuesToUpdate.push(name);
    }

    if (registrationNumber) {
      fieldsToUpdate.push('registration_number = ?');
      valuesToUpdate.push(registrationNumber);
    }

    if (profilePicture) {
      const profilePicPath = `/uploads/${profilePicture.name}`;
      fieldsToUpdate.push('profile_picture = ?');
      valuesToUpdate.push(profilePicPath);
    }

    valuesToUpdate.push(mailId);

    if (fieldsToUpdate.length === 0) {
      return NextResponse.json({ message: 'No fields provided for update' }, { status: 400 });
    }

    const queryText = `
      UPDATE students
      SET ${fieldsToUpdate.join(', ')}
      WHERE email = ?;
    `;

    // Debugging: Log the query and parameters
    console.log('Executing Query:', queryText, valuesToUpdate);

    const result = await query(queryText, valuesToUpdate);

    // Check if the profile was successfully updated
    if ('affectedRows' in result && result.affectedRows > 0) {
      return NextResponse.json({ message: 'Profile updated successfully!' }, { status: 200 });
    }

    // Debugging: Log the result if update fails
    console.log('Update Result:', result);

    return NextResponse.json({ message: 'Failed to update profile' }, { status: 400 });
  } catch (error) {
    console.error('Error updating profile:', error);
    return NextResponse.json({ message: 'Failed to update profile. Please try again.' }, { status: 500 });
  }
}
