"use client"; // Required for client-side components

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation"; // Use App Router navigation hook

import styles from "./Header.module.css";


 // Ensure styles are correctly imported

type HeaderProps = {
  email: string;
  loginType: string;
};

const Header: React.FC<HeaderProps> = ({ email, loginType }) => {
  const router = useRouter(); // App Router navigation hook

  const handleLogout = () => {
    router.push("/Login"); // Navigates to Login page
  };

  return (
    <main className="page-container2">
    <div className={styles.header}>
      {/* Left Section with Logo */}
      <div className={styles.left}>
        <Image
          src="https://drive.google.com/uc?export=view&id=1EbCAvMXa3dGZJ0lWcx2FE9p_nwzYf0wX"
          alt="Logo"
          width={157}
          height={43}
          priority
        />
      </div>

      {/* Right Section with Email and Login Button */}
      <div className={styles.right}>
        <span className={styles.email}>{email}</span>
        <button className={styles.loginButton} onClick={handleLogout}>
          {loginType}
        </button>
      </div>
    </div>
    </main>
  );
};

export default Header;
