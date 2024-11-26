import React from "react";

interface TestDetailsCardProps {
  testName: string;
  name: string;
  email: string;
}

const TestDetailsCard: React.FC<TestDetailsCardProps> = ({
  testName,
  name,
  email,
}) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        border: "1px solid #e0e0e0",
        borderRadius: "8px",
        backgroundColor: "#ffffff",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        maxWidth: "500px",
        margin: "10px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Section: Test Name, Name, and Email */}
      <div>
        {/* Test Name */}
        <div
          style={{
            fontWeight: "bold",
            fontSize: "16px",
            marginBottom: "8px",
          }}
        >
          {testName}
        </div>
        {/* Name */}
        <div
          style={{
            color: "#6f6f6f",
            fontSize: "14px",
            marginBottom: "4px",
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

      {/* Right Section: Arrow Icon */}
      <div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 6L15 12L9 18"
            stroke="blue"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default TestDetailsCard;
