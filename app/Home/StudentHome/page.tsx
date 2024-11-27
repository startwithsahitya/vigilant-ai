"use client";

import React from "react";
import { useSession } from "next-auth/react"; // For user session management
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./StudentHome.module.css";

const StudentHome: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Placeholder during session fetch
  }

  // If no session, display a message to log in
  if (!session) {
    return <div>Please log in to access your dashboard.</div>;
  }

  // Destructure user from session to ensure type safety
  const { user } = session;

  if (!user) {
    return <div>Please log in to access your dashboard.</div>; // Check if user exists in session
  }

  return (
    <main className={styles.page}>
      {/* Safely access email and role */}
      <Header email={user.email || "Guest"} loginType={user.role || "Teacher"} />
      <div className={styles.content}>
        <Sidebar />
        {/* Add additional content as necessary */}
      </div>
    </main>
  );
};

export default StudentHome;
