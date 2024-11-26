import React, { useState } from 'react';

const ClickableButton: React.FC = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  const handleMouseDown = () => {
    setIsPressed(true); // Indicate the button is being pressed
  };

  const handleMouseUp = () => {
    setIsPressed(false); // Reset the pressed state
  };

  return (
    <div
      style={{
        width: '224px',
        height: '208px',
        border: "1px solid #ccc",
        backgroundColor: '#FAFAFA', // Grey background for the box
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0px', 
        
      }}
    >
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: isPressed ? '#e0e0e0' : 'white', // Change background color when clicked
          color: 'black',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer', // Pointer cursor on hover
          transform: isPressed ? 'scale(0.95)' : 'scale(1)', // Slightly shrink button when clicked
          transition: 'transform 0.1s, background-color 0.1s', // Smooth transition for effects
         
        }}
        onMouseDown={handleMouseDown} // Triggered when the mouse button is pressed
        onMouseUp={handleMouseUp} // Triggered when the mouse button is released
        onMouseLeave={handleMouseUp} // Ensure reset if the mouse leaves the button
        onClick={handleButtonClick} // Alert on button click
      >
        Add Test
      </button>
    </div>
  );
};

export default ClickableButton;
