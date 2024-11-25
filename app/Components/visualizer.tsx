"use client"; // Required for client-side rendering in Next.js

import React from "react";

const VisualizerWithLabel: React.FC = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column", // Stack items vertically
        justifyContent: "center",
        alignItems: "center",
        gap: "10px", // Space between the upper part and the visualizer
      }}
    >
      {/* Upper Part (e.g., a label or title) */}
      <div
        style={{
          color: "white", // White text
          fontSize: "16px", // Font size
          fontWeight: "bold", // Bold text
        }}
      >
        Audio Visualizer
      </div>

      {/* Visualizer */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black", // Black background
          width: "100px",
          height: "100px",
          borderRadius: "50%", // Circular container
        }}
      >
        {/* Visualizer Bars */}
        <div
          style={{
            display: "flex",
            gap: "4px", // Spacing between bars
          }}
        >
          {/* Individual Bars */}
          {[8, 12, 18, 12, 8].map((height, index) => (
            <div
              key={index}
              style={{
                width: "4px", // Bar width
                height: `${height}px`, // Dynamic height
                backgroundColor: "white", // White bars
                borderRadius: "2px", // Rounded edges
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VisualizerWithLabel;
