"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState<string>(""); // State for email
  const [password, setPassword] = useState<string>(""); // State for password
  const [action, setAction] = useState<"login" | "register">("login"); // State for action
  const [role, setRole] = useState<"teacher" | "student" | null>(null); // State for role
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [error, setError] = useState<string | null>(null); // Error state for handling API errors
  const router = useRouter(); // Use useRouter for redirection

  // Helper function to set role and action
  const handleRoleSelection = (role: "student" | "teacher") => {
    setRole(role);
    setAction("login"); // Default to login when role is selected
  };

  const handleMainActionWrapper = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!email || !password || !role) {
      setError("Please provide email, password, and select a role");
      return;
    }
  
    setIsLoading(true); // Set loading state
    setError(null); // Clear previous error
  
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }), // Send email, password, and role
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Login successful");
        // Store the JWT token in localStorage (or cookies for better security)
        localStorage.setItem('token', data.token);
  
        // Redirect user based on role
        if (role === "student") {
          router.push("/dashboard/student"); // Redirect to student dashboard
        } else if (role === "teacher") {
          router.push("/dashboard/teacher"); // Redirect to teacher dashboard
        }
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false); // Reset loading state
    }
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
            onClick={() => handleRoleSelection("student")}
          >
            Student
          </button>
          <button
            className={styles.button}
            onClick={() => handleRoleSelection("teacher")}
          >
            Teacher
          </button>
        </div>

        {/* Role Information for Login */}
        {action === "login" && role && (
          <p className={styles.roleInfo}>
            Logging in as: <strong>{role}</strong>
          </p>
        )}

        {/* Login/Register Form */}
        {(action === "login" || role) && (
          <form className={styles.inputContainer} onSubmit={handleMainActionWrapper}>
            <label className={styles.label} htmlFor="email">
              Enter Email
            </label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
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
              required
            />

            {/* Submit Button */}
            <button
              className={styles.mainButton}
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Login"}
            </button>

            {/* Show Error Message */}
            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
