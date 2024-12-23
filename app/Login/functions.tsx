
export const onButtonClick = (
  buttonId: number,
  setActionType: (action: string) => void,
  setRole: (role: 'teacher' | 'student' | null) => void
) => {
  if (buttonId === 1) {
    setActionType('login');
    setRole('student');
  } else if (buttonId === 2) {
    setActionType('login');
    setRole('teacher');
  } else {
    setActionType('login');
    setRole(null);
  }
};


