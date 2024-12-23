"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./ResultPage.module.css";

interface ResultPageProps {
  email: string; // Get email from Sidebar
}

const ResultPage = ({ email }: ResultPageProps) => {
  const [results, setResults] = useState<any[]>([]); // To store multiple result data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state
  const router = useRouter();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch("/api/getResult", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }), // Send email in the request body
        });

        const data = await response.json();

        if (response.ok) {
          setResults(data); // Store multiple result data
        } else {
          setError(data.message || "Failed to fetch result.");
        }
      } catch (error) {
        setError("An error occurred while fetching the result.");
      } finally {
        setLoading(false);
      }
    };

    fetchResults(); // Trigger the API call when component mounts
  }, [email]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!results.length) {
    return <div>No result available for this student.</div>;
  }

  return (
    <div className={styles.resultContainer}>
      <h2>Test Results</h2>
      {results.map((result, index) => (
        <div key={index} className={styles.resultCard}>
          <p><strong>Test Name:</strong> {result.test_name}</p>
          <p><strong>Teacher:</strong> {result.teacher_id}</p>
          <p><strong>Result:</strong> {result.result}</p>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(result.result / result.total_marks) * 100}%` }}
            ></div>
          </div>
          <p><strong>Marks: </strong>{result.result} / {result.total_marks}</p>
        </div>
      ))}
    </div>
  );
};

export default ResultPage;
