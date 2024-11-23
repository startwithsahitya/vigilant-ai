"use client"; // Enables client-side rendering for this file

import { useState } from "react";
import Image from "next/image"; // Import the Image component from Next.js
import styles from "./LoginPage.module.css"; // Import your styles

export default function LoginPage() {
  const [id, setId] = useState<string>(""); // State for ID
  const [password, setPassword] = useState<string>(""); // State for Password
  const [action, setAction] = useState<"login" | "register">("login"); // State for action

  const handleButtonClick = (buttonNumber: number) => {
    switch (buttonNumber) {
      case 1:
        console.log("Student button clicked");
        setAction("login");
        break;
      case 2:
        console.log("Teacher button clicked");
        setAction("login");
        break;
      case 3:
        console.log("New Register button clicked");
        setAction("register");
        break;
      default:
        console.log("Unknown button clicked");
        break;
    }
  };

  const handleMainAction = () => {
    if (!id || !password) {
      console.error("ID and Password are required!");
      return;
    }
    if (action === "login") {
      console.log("Logging in with ID:", id, "and Password:", password);
    } else if (action === "register") {
      console.log("Registering with ID:", id, "and Password:", password);
    }
  };

  return (
    <main className={styles.pageContainer}>
      {/* Image Container (Logo on top) */}
      <div className={styles.imageContainer}>
        <Image
          src="https://drive.google.com/uc?export=view&id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX" // Ensure this is publicly accessible
          alt="Login Icon"
          width={236}
          height={65}
        />
      </div>

      {/* Box Container for the form */}
      <div className={styles.boxContainer}>
        <h1 className={styles.title}>
          {action === "login" ? "Login" : "Register"}
        </h1>

        <div className={styles.inputContainer}>
          <label className={styles.label} htmlFor="id">
            Enter ID
          </label>
          <input
            id="id"
            className={styles.input}
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="Enter your ID"
            aria-label="ID input"
          />

          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            className={styles.input}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            aria-label="Password input"
          />
        </div>

        <div className={styles.buttonContainer}>
          <button
            className={`${styles.button}`}
            onClick={() => handleButtonClick(1)}
          >
            Student
          </button>
          <button
            className={`${styles.button}`}
            onClick={() => handleButtonClick(2)}
          >
            Teacher
          </button>
          <button
            className={`${styles.button}`}
            onClick={() => handleButtonClick(3)}
          >
            New Register
          </button>
        </div>

        <button className={styles.mainButton} onClick={handleMainAction}>
          {action === "login" ? "Login" : "Register"}
        </button>
      </div>
    </main>
  );
}
