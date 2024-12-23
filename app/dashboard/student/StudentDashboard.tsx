"use client";

import { useState, useEffect } from "react";
import styles from "./StudentDashboard.module.css";

const StudentDashboard = ({ email }: { email: string }) => {
  const [assignedTests, setAssignedTests] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchAssignedTests = async () => {
      try {
        const response = await fetch(`/api/getAssignedTests?email=${email}`);
        const data = await response.json();

        if (data.tests && data.tests.length > 0) {
          setAssignedTests(data.tests);
        } else {
          setAssignedTests([]);
        }
      } catch (error) {
        console.error("Error fetching assigned tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignedTests();
  }, [email]);

  return (
    <div className={styles.dashboardContainer}>
      <h2 className={styles.dashboardHeader}>Welcome, {email}</h2>

      {loading && <p className={styles.loadingMessage}>Loading test assignments...</p>}

      {assignedTests.length === 0 && !loading && (
        <p className={styles.notAssignedMessage}>No tests assigned to you at the moment.</p>
      )}

      {assignedTests.length > 0 && !loading && (
        <div className={styles.testList}>
          {assignedTests.map((test) => (
            <div key={test.test_name} className={styles.testRow}>
              <div className={styles.testInfo}>
                <p className={styles.testDetails}>Teacher ID: {test.teacher_id}</p>
                <p className={styles.testDetails}>Student ID: {email}</p>
                <p className={styles.testDetails}>Test Name: {test.test_name}</p>
                <a
                  href={`/dashboard/student/Taketest?id=${test.test_name}`} // Pass the test_name in the query string
                  className={styles.testButton}
                >
                  Go to Test
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentDashboard;
