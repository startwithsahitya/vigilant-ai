// types.ts
export interface Student {
    studentId: string;
    name: string;
    email: string;
    // Add other fields if necessary
  }
  
  export interface Test {
    testId: string;
    testName: string;
    questions: {
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  }
  