import React, { useState } from "react";

type Checkpoint = {
  name: string;
  status: "success" | "loading" | "error";
};

const App: React.FC = () => {
  const [checkpoints, setCheckpoints] = useState<Checkpoint[]>([
    { name: "Camera Check", status: "loading" },
    { name: "Bluetooth Check", status: "success" },
    { name: "Microphone Check", status: "error" },
    { name: "Voice Check", status: "loading" },
    { name: "Face Check (Scan)", status: "success" },
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <img src="/icons/tick.svg" alt="Success Icon" style={{ width: "16px", height: "16px" }} />;
      case "loading":
        return <img src="/icons/loading.svg" alt="Loading Icon" style={{ width: "16px", height: "16px" }} />;
      case "error":
        return "❌";
      default:
        return null;
    }
  };
  

  return (
    <div
      style={{
        width: "244px",
        height: "208px",
        border: "1px solid #ccc",
        padding: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        backgroundColor: "#FAFAFA",
      }}
    >
      {checkpoints.map((checkpoint, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "4px 0",
            fontSize: "14px",
            color: '#6D6D6D',
            fontFamily: "Arial, sans-serif",
          }}
        >
          <span>{checkpoint.name}</span>
          <span>{getStatusIcon(checkpoint.status)}</span>
        </div>
      ))}
    </div>
  );
};

export default App;
