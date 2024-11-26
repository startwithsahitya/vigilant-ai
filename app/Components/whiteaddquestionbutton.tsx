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
          backgroundColor: "white", // White background
          color: "black", // Black text for contrast
          border: "1px solid #ccc", // Light gray border
          borderRadius: "6px",
          fontSize: "16px",
          cursor: "pointer",
        }}
        onClick={() => alert("Button clicked!")}
      >
        Add Question
      </button>
    </div>
  );
};

export default Button;
