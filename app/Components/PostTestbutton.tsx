import React, { useState } from 'react';

const TwoButtonComponent: React.FC = () => {
  const [pressedButton, setPressedButton] = useState<number | null>(null);

  const handleButtonClick = (buttonNumber: number) => {
    alert(`Button ${buttonNumber} clicked!`);
  };

  const handleMouseDown = (buttonNumber: number) => {
    setPressedButton(buttonNumber); // Mark the button as pressed
  };

  const handleMouseUp = () => {
    setPressedButton(null); // Reset the pressed state
  };

  return (
    <div
      style={{
        width: '224px',
        height: '208px',
        backgroundColor: '#FAFAFA',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        border: "1px solid #ccc",
        padding: '10px',
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#535252',
        }}
      >
        Test 1
      </h3>

      {/* Buttons */}
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: pressedButton === 1 ? '#e0e0e0' : 'white', // Change color when pressed
          color: 'black',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          marginBottom: '10px', // Space between the two buttons
          transform: pressedButton === 1 ? 'scale(0.95)' : 'scale(1)', // Shrink on press
          transition: 'transform 0.1s, background-color 0.1s', // Smooth animation
        }}
        onMouseDown={() => handleMouseDown(1)} // Trigger pressed state for Button 1
        onMouseUp={handleMouseUp} // Reset pressed state
        onMouseLeave={handleMouseUp} // Ensure reset if the mouse leaves the button
        onClick={() => handleButtonClick(1)} // Handle click for Button 1
      >
        Edit
      </button>
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: pressedButton === 2 ? '#00008B' : '#334EFF', // Change shade when pressed
          color: 'white', // Adjust text color for contrast
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transform: pressedButton === 2 ? 'scale(0.95)' : 'scale(1)', // Shrink on press
          transition: 'transform 0.1s, background-color 0.1s', // Smooth animation
        }}
        onMouseDown={() => handleMouseDown(2)} // Trigger pressed state for Button 2
        onMouseUp={handleMouseUp} // Reset pressed state
        onMouseLeave={handleMouseUp} // Ensure reset if the mouse leaves the button
        onClick={() => handleButtonClick(2)} // Handle click for Button 2
      >
        Post
      </button>
    </div>
  );
};

export default TwoButtonComponent;
