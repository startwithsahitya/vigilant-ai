import React from "react";

// Props Interface
interface TestCardProps {
  testName: string;
  name: string;
  email: string;
  score: string;
}

// Functional Component
const TestCard: React.FC<TestCardProps> = ({
  testName,
  name,
  email,
  score,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "10px auto", // Centers the card on the page
        fontFamily: "Arial, sans-serif", // Ensure consistent font
      }}
    >
      {/* Left Section */}
      <div>
        {/* Test Name */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "8px", // Adds space below
          }}
        >
          {testName}
        </div>
        {/* Name */}
        <div
          style={{
            color: "#6f6f6f",
            fontSize: "14px",
            lineHeight: "20px", // Ensures readability
          }}
        >
          {name}
        </div>
        {/* Email */}
        <div
          style={{
            color: "#6f6f6f",
            fontSize: "14px",
          }}
        >
          {email}
        </div>
      </div>

      {/* Right Section (Score) */}
      <div
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "green",
          marginLeft: "20px", // Adds spacing from the left section
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default TestCard;
