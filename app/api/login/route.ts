import { auth } from '@/lib/firebase'; // Firebase initialization file (assuming it's exported from here)
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importing Firebase Authentication method

export default async function handler(req: any, res: any) {
  if (req.method === 'POST') {
    const { id, password, role } = req.body;

    try {
      // Sign in with email and password using Firebase Auth
      const userCredential = await signInWithEmailAndPassword(auth, id, password);
      const user = userCredential.user;

      // Send user info and role back in the response
      res.status(200).json({ uid: user.uid, role });
    } catch (error: unknown) {
      // Type-cast error to `Error` to access the message safely
      if (error instanceof Error) {
        res.status(400).json({ message: 'Login failed: ' + error.message });
      } else {
        res.status(400).json({ message: 'An unexpected error occurred!' });
      }
    }
  } else {
    // If method is not POST, return method not allowed
    res.status(405).json({ message: 'Method not allowed' });
  }
}
