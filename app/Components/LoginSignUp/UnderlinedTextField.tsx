import React, { useState } from "react";

interface UnderlinedTextFieldProps {
  placeholder: string;
  type?: string; // e.g., "text", "password", etc.
  value: string;
  onChange: (value: string) => void;
}

const UnderlinedTextField: React.FC<UnderlinedTextFieldProps> = ({
  placeholder,
  type = "text",
  value,
  onChange,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div style={styles.container}>
      <input
        style={{
          ...styles.input,
          borderBottomColor: isFocused ? "#3366FF" : "#ccc", // Dynamic underline color
        }}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    maxWidth: "300px",
    margin: "10px 0",
  },
  input: {
    width: "100%",
    border: "none",
    borderBottom: "2px solid #ccc",
    outline: "none",
    fontSize: "16px",
    padding: "5px 0",
    transition: "border-bottom-color 0.3s ease",
  },
};

export default UnderlinedTextField;
