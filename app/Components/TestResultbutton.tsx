import React, { useState } from 'react';

const ClickableButton: React.FC = () => {
  const [testNumber, setTestNumber] = useState(1); // Initialize test number with 1
  const [isPressed, setIsPressed] = useState(false); // Track if the button is pressed

  const handleButtonClick = () => {
    alert(`Button for Test ${testNumber} clicked!`);
  };

  const handleMouseDown = () => {
    setIsPressed(true); // Mark the button as pressed
  };

  const handleMouseUp = () => {
    setIsPressed(false); // Reset the pressed state
  };

  return (
    <div
      style={{
        width: '224px',
        height: '208px',
        backgroundColor: '#FAFAFA', // Grey background for the box
        display: 'flex',
        flexDirection: 'column', // Stack elements vertically
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px', // Add some padding
        border: '1px solid #ccc',
      }}
    >
      {/* Test Statement */}
      <p
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '10px', // Add space below the text
          color: '#535252', // Grey text
        }}
      >
        Test {testNumber}
      </p>

      {/* Button */}
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: isPressed ? '#228B22' : '#08A100', // Darker green when pressed
          color: 'white',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer', // Pointer cursor on hover
          transform: isPressed ? 'scale(0.95)' : 'scale(1)', // Shrink when pressed
          transition: 'transform 0.1s, background-color 0.1s', // Smooth animation
          border: 'none',
          borderRadius: '5px', // Rounded corners for a modern look
        }}
        onMouseDown={handleMouseDown} // Trigger pressed state
        onMouseUp={handleMouseUp} // Reset pressed state
        onMouseLeave={handleMouseUp} // Ensure reset if mouse leaves the button
        onClick={handleButtonClick} // Handle button click
      >
        Result
      </button>
    </div>
  );
};

export default ClickableButton;
