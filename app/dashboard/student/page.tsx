'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./StudentHome.module.css";
import jwt from "jsonwebtoken";

const StudentHome: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.replace("/login");
      return;
    }

    try {
      const decodedToken: any = jwt.decode(token);
      if (decodedToken && decodedToken.role === "student") {
        setIsAuthenticated(true);
        setRole(decodedToken.role);
        setEmail(decodedToken.email || "");
      } else {
        router.replace("/access-denied");
      }
    } catch (error) {
      console.error("Invalid token", error);
      router.replace("/Login");
    }
  }, [router]);

  if (!isAuthenticated) {
    return <div className={styles.loading}>Loading...</div>;
  }

  return (
    <main className={styles.page}>
      <Header email={email} loginType={role || "guest"} />
      <div className={styles.content}>
        <Sidebar email={email} />
      </div>
    </main>
  );
};

export default StudentHome;
