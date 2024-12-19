"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react"; // Import signOut from next-auth
import styles from "./Header.module.css";

type HeaderProps = {
  email: string;
  loginType: string;
};

const Header: React.FC<HeaderProps> = ({ email, loginType }) => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      // Using next-auth's signOut method to handle logout
      await signOut({ redirect: false }); // Avoid automatic redirection after logout

      // Remove the JWT token from localStorage to ensure the user is logged out
      localStorage.removeItem("token");

      // Manually redirect to the login page after logout
      router.push("/Not Access");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <header className={styles.header}>
      {/* Left Section: Logo */}
      <div className={styles.left}>
        <Image
          src="https://drive.google.com/uc?export=view&id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX"
          alt="Logo"
          width={157}
          height={43}
          priority
        />
      </div>

      {/* Right Section: User Info */}
      <div className={styles.right}>
        <span className={styles.email}>{email}</span>
        <button
          className={styles.loginButton}
          onClick={handleLogout}
          aria-label={`Logout as ${loginType}`}
        >
          Logout ({loginType})
        </button>
      </div>
    </header>
  );
};

export default Header;
