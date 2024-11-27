'use client';

import { useState } from "react";
import Image from "next/image";
import { handleMainAction, handleButtonClick, handleRoleSelection  } from "./functions";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [id, setId] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for Password
  const [action, setAction] = useState<"login" | "register">("login"); // State for action
  const [role, setRole] = useState<"teacher" | "student" | null>(null); // State for role
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleMainActionWrapper = async () => {
    if (!id || !password) {
      alert("Please provide both email and password!");
      return;
    }

    setIsLoading(true);
    await handleMainAction(id, password, action, role);
    setIsLoading(false);
  };

  return (
    <main className={styles.pageContainer}>
      {/* Logo Section */}
      <div className={styles.imageContainer}>
        <Image
          src="https://drive.google.com/uc?export=view&id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX"
          alt="Login Icon"
          width={236 / 1.2}
          height={65 / 1.2}
        />
      </div>

      {/* Action Section */}
      <div className={styles.boxContainer}>
        <h1 className={styles.title}>{action === "login" ? "Login" : "Register"}</h1>

        {/* Action Buttons */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.button}
            onClick={() => handleButtonClick(1, setAction, setRole)}
          >
            Student
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick(2, setAction, setRole)}
          >
            Teacher
          </button>
          <button
            className={styles.button}
            onClick={() => handleButtonClick(3, setAction, setRole)}
          >
            New Register
          </button>
        </div>

        {/* Role Selection for Registration */}
        {action === "register" && !role && (
          <div className={styles.roleSelection}>
            <p>Please select a role:</p>
            <div className={styles.buttonContainer}>
              <button
                className={styles.button2}
                onClick={() => handleRoleSelection("student", setRole)}
              >
                Student
              </button>
              <button
                className={styles.button2}
                onClick={() => handleRoleSelection("teacher", setRole)}
              >
                Teacher
              </button>
            </div>
          </div>
        )}

        {/* Role Information for Login */}
        {action === "login" && role && (
          <p className={styles.roleInfo}>Logging in as: <strong>{role}</strong></p>
        )}

        {/* Login/Register Form */}
        {(action === "login" || role) && (
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="id">
              Enter Email
            </label>
            <input
              id="id"
              className={styles.input}
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              placeholder="Enter your email"
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
            />

            {/* Submit Button */}
            <button
              className={styles.mainButton}
              onClick={handleMainActionWrapper}
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : action === "login" ? "Login" : "Register"}
            </button>
          </div>
        )}
      </div>
    </main>
  );
}