"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./Header.module.css";

type HeaderProps = {
  email: string;
  loginType: string;
};

const Header: React.FC<HeaderProps> = ({ email, loginType }) => {
  const router = useRouter();

  const handleLogout = async () => {
    // If you have a logout API, call it here
    await fetch("/api/auth/logout", { method: "POST" }); // Optional API call
    router.push("/Login");
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
          {loginType}
        </button>
      </div>
    </header>
  );
};

export default Header;
