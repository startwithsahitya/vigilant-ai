import bcrypt from 'bcrypt';

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


