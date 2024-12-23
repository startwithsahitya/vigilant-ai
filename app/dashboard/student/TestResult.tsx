// pages/student/testResult/[testId].tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const TestResult = () => {
  const router = useRouter();
  const { testId } = router.query;
  const [score, setScore] = useState<number | null>(null);

  useEffect(() => {
    if (testId) {
      // Fetch score from the database using testId
      fetch(`/api/getTestResult?testId=${testId}`)
        .then((res) => res.json())
        .then((data) => setScore(data.score));
    }
  }, [testId]);

  return (
    <div>
      <h1>Your Score: {score !== null ? score : 'Loading...'}</h1>
    </div>
  );
};

export default TestResult;
