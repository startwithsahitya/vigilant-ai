import React from "react";

interface ScoreCardProps {
  name: string;
  email: string;
  score: string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ name, email, score }) => {
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
        maxWidth: "400px",
        margin: "10px auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Left Section: Name and Email */}
      <div>
        <div
          style={{
            
            fontSize: "16px",
            marginBottom: "4px",
          }}
        >
          {name}
        </div>
        <div
          style={{
            color: "#6f6f6f",
            fontSize: "14px",
          }}
        >
          {email}
        </div>
      </div>

      {/* Right Section: Score */}
      <div
        style={{
          fontWeight: "bold",
          fontSize: "20px",
          color: "green",
        }}
      >
        {score}
      </div>
    </div>
  );
};

export default ScoreCard;
