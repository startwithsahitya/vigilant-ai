'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // For programmatic navigation
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./StudentHome.module.css";
import jwt from 'jsonwebtoken'; // Import JWT to verify the token

const StudentHome: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string>(""); // Ensure role is a string, with a default empty string
  const [email, setEmail] = useState<string>(""); // State for storing email
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decodedToken: any = jwt.decode(token); // Decode the token
      if (decodedToken && decodedToken.role === "student") {
        setIsAuthenticated(true);
        setRole(decodedToken.role); // Set the role to "student"
        setEmail(decodedToken.email); // Set the email from token
      } else {
        router.replace("/access-denied");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.replace("/Login");
    }
  }, [router]);

  // Show a loading message or spinner while checking authentication
  if (!isAuthenticated) {
    return <div className={styles.loading}>Loading...</div>;
  }

  // Render the student dashboard if authenticated
  return (
    <main className={styles.page}>
      {/* Header with email and role */}
      <Header email={email} loginType={role || "guest"} />
      <div className={styles.content}>
        <Sidebar />
        <section className={styles.dashboardContent}>
          <h2>Welcome to your Student Dashboard</h2>
          <div className={styles.additionalContent}>
            <p>This is where your student-specific content will appear.</p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default StudentHome;
