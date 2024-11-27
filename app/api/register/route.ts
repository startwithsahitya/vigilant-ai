import { auth, firestore } from '@/lib/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default async function handler(req: any, res: any) {
  const { id, password, role } = req.body;

  try {
    // Register the user with email and password
    const userCredential = await createUserWithEmailAndPassword(auth, id, password);
    const user = userCredential.user;

    // Store user data and role in Firestore
    await setDoc(doc(firestore, 'users', user.uid), {
      email: user.email,
      role: role,
    });

    // Respond with success
    res.status(200).json({ success: true });
  } catch (error: unknown) {
    // Type-casting error to `Error`
    if (error instanceof Error) {
      res.status(400).json({ success: false, message: error.message });
    } else {
      // In case the error is not an instance of Error
      res.status(400).json({ success: false, message: 'An unexpected error occurred!' });
    }
  }
}
