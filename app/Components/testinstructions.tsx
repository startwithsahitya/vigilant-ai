import React from "react";

const TestInstructions: React.FC = () => {
  const instructions = [
    {
      title: "Full-Screen Mode",
      items: [
        "This assessment will work only in full-screen mode and repeated violations will result in termination of the test.",
        "Switching tabs results in a full-screen violation.",
        "Screen sharing on video conferencing tools (Google Meet, Zoom, MS Teams, etc.) may result in a full-screen violation.",
        "Pressing the Escape button or clicking outside will result in a full-screen violation.",
        "Computer going into sleep mode due to an auto-timer, power cut, or power drain may result in a full-screen violation.",
      ],
    },
    {
      title: "Screen Sharing",
      items: [
        "I’m allowing screen sharing to this website to detect and track my activity during the assessment.",
        "Screen sharing should not be closed during the assessment, as this may result in termination of the assessment.",
        "I’ve hidden the screen sharing pop-up to avoid violating the full-screen mode.",
      ],
    },
    {
      title: "Camera Access",
      items: [
        "I’m allowing camera access to this website to detect, verify, and process my face during the assessment.",
        "I’m the person who should be taking the assessment and not someone else.",
        "My face will be clearly visible during the assessment.",
        "During the assessment, someone else cannot continue on my behalf.",
      ],
    },
  ];

  const handleNext = () => {
    alert("Proceeding to the next step!");
    // Add navigation logic here if using React Router, etc.
  };

  return (
    <div
      style={{
        width: "700px",
        margin: "50px auto",
        fontFamily: "Arial, sans-serif",
        border: "1px solid #ddd",
        borderRadius: "10px",
        padding: "30px",
        backgroundColor: "#fff",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        position: "relative",
      }}
    >
      {/* Main Title */}
      <h1
        style={{
          fontSize: "22px",
          fontWeight: "bold",
          marginBottom: "30px",
          textAlign: "center",
        }}
      >
        Things to Keep in Mind Before Attempting for the Test
      </h1>

      {/* Instructions Sections */}
      {instructions.map((section, index) => (
        <div key={index} style={{ marginBottom: "30px" }}>
          {/* Section Title */}
          <h2
            style={{
              fontSize: "18px",
              fontWeight: "bold",
              marginBottom: "15px",
              color: "#333",
            }}
          >
            {section.title}
          </h2>

          {/* Section Items */}
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {section.items.map((item, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: "15px",
                  fontSize: "16px",
                  color: "#555",
                  lineHeight: "1.5",
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        style={{
          position: "absolute",
          bottom: "20px",
          right: "20px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
        }}
      >
        Next
      </button>
    </div>
  );
};

export default TestInstructions;
