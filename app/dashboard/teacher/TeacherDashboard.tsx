import React, { useState } from "react";

interface TestInputFormProps {
  email: string; // Teacher's email passed from the parent component
}

const TestInputForm: React.FC<TestInputFormProps> = ({ email }) => {
  const [studentEmail, setStudentEmail] = useState("");
  const [testName, setTestName] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(""); // Clear any previous messages

    if (!studentEmail || !testName) {
      setMessage("Student Email and Test Name are required.");
      return;
    }

    try {
      // Make the API call to submit the test attempt
      const response = await fetch("/api/TestgivenbyTeacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentEmail, // Student email from the input field
          testName,     // Test name from the input field
          teacherEmail: email, // Teacher email passed as a prop
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Test Given successfully!");
      } else {
        setMessage(data.message || "An error occurred while submitting the test attempt.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred while submitting the test attempt.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px" }}>
      <h2>Create a Test</h2>
      <p>Teacher Email: <strong>{email}</strong></p> {/* Display the teacher's email */}
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="studentEmail" style={{ display: "block", marginBottom: "5px" }}>
            Student Email:
          </label>
          <input
            type="email"
            id="studentEmail"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            placeholder="Enter Student Email"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label htmlFor="testName" style={{ display: "block", marginBottom: "5px" }}>
            Test Name:
          </label>
          <input
            type="text"
            id="testName"
            value={testName}
            onChange={(e) => setTestName(e.target.value)}
            placeholder="Enter Test Name"
            required
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007BFF",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </form>

      {message && (
        <div style={{ marginTop: "20px", color: message.startsWith("An error") ? "red" : "green" }}>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};

export default TestInputForm;
