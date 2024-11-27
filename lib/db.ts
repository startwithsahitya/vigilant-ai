// /src/lib/db.ts
import admin from '@/utils/firebaseAdmin';  // Firebase Admin setup

const db = admin.firestore();

// Fetch user profile from Firestore
export const getUserProfile = async (userId: string) => {
  const userDoc = await db.collection('users').doc(userId).get();

  if (!userDoc.exists) {
    throw new Error('User profile not found');
  }

  return userDoc.data();  // Return user profile data
};

// Update user profile in Firestore
export const updateUserProfile = async (userId: string, data: { name: string, email: string, bio: string }) => {
  await db.collection('users').doc(userId).update(data);  // Update profile in Firestore
  return { success: true, updatedData: data };
};

// Log user actions in Firestore
export const logUserAction = async (userId: string, action: string, details: string) => {
  const logEntry = {
    userId,
    action,
    details,
    timestamp: admin.firestore.FieldValue.serverTimestamp(),  // Firestore server timestamp
  };

  await db.collection('userLogs').add(logEntry);  // Store log in Firestore
};
