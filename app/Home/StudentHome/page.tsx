// app/Home/StudentHome/page.tsx
"use client"; // Ensure that this is a client-side component

import React from "react";
import { useSession } from "next-auth/react"; // For user session management
import Header from "./Header"; // Assuming you have a Header component
import Sidebar from "./Sidebar"; // Assuming you have a Sidebar component
import styles from "./StudentHome.module.css";

const StudentHome: React.FC = () => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>; // Placeholder during session fetch
  }

  if (!session) {
    return <div>Please log in to access your dashboard.</div>; // Placeholder for unauthenticated users
  }

  const { user } = session;

  if (!user) {
    return <div>Please log in to access your dashboard.</div>; // Check if user exists in session
  }

  return (
    <main className={styles.page}>
      <Header email={user.email || "Guest"} loginType={user.role || "Student"} />
      <div className={styles.content}>
        <Sidebar />
      </div>
    </main>
  );
};

export default StudentHome;
