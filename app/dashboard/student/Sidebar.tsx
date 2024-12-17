import { useState } from "react";
import styles from "./VerticalSidebarWithContent.module.css";

export default function VerticalSidebarWithContent() {
  const [selected, setSelected] = useState("Profile"); // Tracks the selected section

  // Content for each section
  const renderContent = () => {
    switch (selected) {
      case "Profile":
        return <p>Welcome to the Profile section! Here you can view and edit your profile details.</p>;
      case "Test":
        return <p>Take a test or review previous tests in the Test section!</p>;
      case "Results":
        return <p>View your results and progress here in the Results section.</p>;
      default:
        return <p>Select an option from the sidebar to see content.</p>;
    }
  };

  return (
    <div className={styles.container}>
      {/* Sidebar */}
      <div className={styles.sidebar}>
        <button
          className={`${styles.button} ${
            selected === "Profile" ? styles.active : ""
          }`}
          onClick={() => setSelected("Profile")}
        >
          Profile
        </button>
        <button
          className={`${styles.button} ${
            selected === "Test" ? styles.active : ""
          }`}
          onClick={() => setSelected("Test")}
        >
          Test
        </button>
        <button
          className={`${styles.button} ${
            selected === "Results" ? styles.active : ""
          }`}
          onClick={() => setSelected("Results")}
        >
          Results
        </button>
      </div>

      {/* Main Content */}
      <div className={styles.content}>
        <h1>{selected}</h1>
        {renderContent()}
      </div>
    </div>
  );
}
