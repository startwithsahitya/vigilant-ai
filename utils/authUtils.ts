// /src/utils/authUtils.ts
import admin from './firebaseAdmin';  // Firebase Admin setup

// Authenticate the user using Firebase ID Token from request headers
export const authenticateUser = async (req: any) => {
  const token = req.headers.get('Authorization')?.replace('Bearer ', '');
  if (!token) {
    throw new Error('No token provided');
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);  // Verify the ID token
    return decodedToken.uid;  // Return the user ID (UID)
  } catch (error) {
    throw new Error('Unauthorized access');
  }
};
