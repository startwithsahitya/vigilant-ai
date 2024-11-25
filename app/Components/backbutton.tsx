"use client"; // Required for client-side rendering in Next.js

import React from "react";

const BackButton: React.FC = () => {
  return (
    <button
      style={{
        width: "50px", // Button width
        height: "50px", // Button height
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // White background
        border: "1px solid #ccc", // Light gray border
        borderRadius: "8px", // Slightly rounded corners
        cursor: "pointer",
        outline: "none",
      }}
      onClick={() => alert("Back button clicked!")} // Action for the button
    >
      {/* Left Arrow Icon */}
      <div
        style={{
          width: "10px",
          height: "10px",
          borderLeft: "3px solid blue", // Blue arrow line
          borderBottom: "3px solid blue", // Blue arrow line
          transform: "rotate(45deg)", // Rotates to form a left arrow
        }}
      />
    </button>
  );
};

export default BackButton;
