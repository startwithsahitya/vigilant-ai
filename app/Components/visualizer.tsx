import React from "react";

const EqualizerIcon: React.FC = () => {
  const barStyles = {
    width: "4px",
    backgroundColor: "#fff",
    margin: "0 2px",
    display: "inline-block",
    borderRadius: "2px",
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100px",
        width: "100px",
        backgroundColor: "#000",
        borderRadius: "50%",
      }}
    >
      <div style={{ ...barStyles, height: "10px" }}></div>
      <div style={{ ...barStyles, height: "20px" }}></div>
      <div style={{ ...barStyles, height: "40px" }}></div>
      <div style={{ ...barStyles, height: "20px" }}></div>
      <div style={{ ...barStyles, height: "10px" }}></div>
    </div>
  );
};

export default EqualizerIcon;
