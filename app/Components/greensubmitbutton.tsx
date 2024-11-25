"use client"; // Required since it includes client-side components

// components/Button.tsx
import React from "react";

const NButton: React.FC = () => {
  return (
    <div
      
    >
      <button
        style={{
          width: "134px",
          height: "44px",
          backgroundColor: "#28a745", // Green color
          color: "white",
          border: "none",
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => alert("Button clicked!")}
      >
      Submit
      </button>
    </div>
  );
};

export default NButton;