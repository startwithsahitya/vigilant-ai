import bcrypt from 'bcrypt';
import { User } from '@/app/types/user'; 

export const onButtonClick = (
  buttonId: number,
  setActionType: (action: string) => void,
  setRole: (role: 'teacher' | 'student' | null) => void
) => {
  if (buttonId === 1) {
    setActionType('register');
    setRole('student');
  } else if (buttonId === 2) {
    setActionType('register');
    setRole('teacher');
  } else {
    setActionType('register');
    setRole(null);
  }
};


