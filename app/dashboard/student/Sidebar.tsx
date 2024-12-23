// VerticalSidebarWithContent.tsx
"use client";

import { useState } from "react";
import styles from "./VerticalSidebarWithContent.module.css";
import ProfileUI from "./profile";
import StudentDashboard from "./StudentDashboard";
import ResultPage from "./Resultpage";

interface SidebarProps {
  email: string; // Prop passed from the parent component
}

export default function VerticalSidebarWithContent({ email }: SidebarProps) {
  console.log("Rendering VerticalSidebarWithContent with email:", email); // Debugging log

  const [selected, setSelected] = useState("Profile");

  const renderContent = () => {
    switch (selected) {
      case "Profile":
        return <ProfileUI email={email} />; // Pass email to ProfileUI
      case "Test":
        return <StudentDashboard email={email} />; // Pass email to StudentDashboard
      case "Results":
        return <ResultPage email = {email}/>;
      default:
        return <p>Select an option from the sidebar to see content.</p>;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <button
          className={`${styles.button} ${selected === "Profile" ? styles.active : ""}`}
          onClick={() => setSelected("Profile")}
        >
          Profile
        </button>
        <button
          className={`${styles.button} ${selected === "Test" ? styles.active : ""}`}
          onClick={() => setSelected("Test")}
        >
          Test
        </button>
        <button
          className={`${styles.button} ${selected === "Results" ? styles.active : ""}`}
          onClick={() => setSelected("Results")}
        >
          Results
        </button>
      </div>
      <div className={styles.content}>
        <h1>{selected}</h1>
        {renderContent()}
      </div>
    </div>
  );
}
