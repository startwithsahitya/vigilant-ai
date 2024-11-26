"use client"; // Required for client-side rendering in Next.js

import React from "react";

const ForwardButton: React.FC = () => {
  return (
    <button
      style={{
        width: "50px",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white", // White background
        border: "1px solid #ccc", // Light gray border
        borderRadius: "8px", // Rounded corners
        cursor: "pointer",
        outline: "none",
      }}
      onClick={() => alert("Forward button clicked!")} // Action for the button
    >
      {/* Right Arrow Icon */}
      <div
        style={{
          width: "10px",
          height: "10px",
          borderRight: "3px solid blue", // Blue arrow line
          borderTop: "3px solid blue", // Blue arrow line
          transform: "rotate(-320deg)", // Rotates to form a right arrow
        }}
      />
    </button>
  );
};

export default ForwardButton;
