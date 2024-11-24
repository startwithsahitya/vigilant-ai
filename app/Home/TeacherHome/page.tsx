"use client"; // Required since it includes client-side components

import React from "react";
import Header from "./Header";
import styles from "./TeacherHome.module.css"; 
import Sidebar from "./Sidebar"

const TeacherHome: React.FC = () => {
  return (
    <main className={styles.page}>
      <Header
        email="raghavendra.mishra@vitbhopal.ac.in"
        loginType="Teacher"
      />
      <Sidebar />;

    
      
    </main>
  );
};

export default TeacherHome;
