"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [action, setAction] = useState<"login" | "register">("login");
  const [role, setRole] = useState<"teacher" | "student" | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRoleSelection = (role: "student" | "teacher") => {
    setRole(role);
    setAction("login");
  };

  const handleMainActionWrapper = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password || !role) {
      setError("Please provide email, password, and select a role");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login successful");

        // Save the JWT token in localStorage
        localStorage.setItem("token", data.token);

        // Save the user profile data
        const userProfile = data.userProfile;
        localStorage.setItem("userProfile", JSON.stringify(userProfile));

        // Redirect based on role
        if (role === "student") {
          router.push("/dashboard/student");
        } else if (role === "teacher") {
          router.push("/dashboard/teacher");
        }
      } else {
        setError(data.error || "An error occurred");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className={styles.pageContainer}>
      <div className={styles.imageContainer}>
        <Image
          src="https://drive.google.com/uc?export=view&id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX"
          alt="Login Icon"
          width={236 / 1.2}
          height={65 / 1.2}
        />
      </div>

      <div className={styles.boxContainer}>
        <h1 className={styles.title}>{action === "login" ? "Login" : "Register"}</h1>

        <div className={styles.buttonContainer}>
          <button className={styles.button} onClick={() => handleRoleSelection("student")}>Student</button>
          <button className={styles.button} onClick={() => handleRoleSelection("teacher")}>Teacher</button>
        </div>

        {action === "login" && role && (
          <p className={styles.roleInfo}>Logging in as: <strong>{role}</strong></p>
        )}

        {(action === "login" || role) && (
          <form className={styles.inputContainer} onSubmit={handleMainActionWrapper}>
            <label className={styles.label} htmlFor="email">Enter Email</label>
            <input
              id="email"
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />

            <label className={styles.label} htmlFor="password">Password</label>
            <input
              id="password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />

            <button className={styles.mainButton} type="submit" disabled={isLoading}>
              {isLoading ? "Processing..." : "Login"}
            </button>

            {error && <p className={styles.errorMessage}>{error}</p>}
          </form>
        )}
      </div>
    </main>
  );
}
