"use client"; // Required since it includes client-side components

// components/Button.tsx
import React from "react";

const Button: React.FC = () => {
  return (
    <div>
      <button
        style={{
          width: "134px",
          height: "44px",
          backgroundColor: "red", // Red background
          color: "white", // White font
          border: "none", // No border
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => alert("Button clicked!")}
      >
        Delete Question
      </button>
    </div>
  );
};

export default Button;
