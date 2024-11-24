"use client"; // Required since it includes client-side components

import React from "react";
import Header from "./Header";
import styles from "./StudentHome.module.css"; 
import Sidebar from "./Sidebar"

const StudentHome: React.FC = () => {
  return (
    <main className={styles.page}>
      <Header
        email="raghavendra.mishra@vitbhopal.ac.in"
        loginType="Student"
      />
      <Sidebar />;

    
      
    </main>
  );
};

export default StudentHome;
