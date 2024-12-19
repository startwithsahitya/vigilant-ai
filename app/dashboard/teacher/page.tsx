'use client';

import React, { useEffect, useState } from "react"; // Added useState import
import { useRouter } from "next/navigation"; // For programmatic navigation
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./TeacherHome.module.css";
import jwt from 'jsonwebtoken'; 

const TeacherHome: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string>(""); // Ensure role is a string, with a default empty string
  const [email, setEmail] = useState<string>(""); // State for storing email
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/Login");
      return;
    }

    try {
      const decodedToken: any = jwt.decode(token); // Decode the token
      if (decodedToken && decodedToken.role === "teacher") {
        setIsAuthenticated(true);
        setRole(decodedToken.role); // Set the role to "teacher"
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

  // Render the teacher dashboard if authenticated
  return (
    <main className={styles.page}>
      {/* Header with email and role */}
      <Header email={email} loginType={role || "guest"} />
      <div className={styles.content}>
        <Sidebar email={email} />
        
      </div>
    </main>
  );
};

export default TeacherHome;
