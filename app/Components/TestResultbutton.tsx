import React, { useState } from 'react';

const ClickableButton: React.FC = () => {
  const [testNumber, setTestNumber] = useState(1); // Initialize test number with 1

  const handleButtonClick = () => {
    alert(`Button for Test ${testNumber} clicked!`);
  };

  return (
    <div
      style={{
        width: '224px',
        height: '208px',
        backgroundColor: '#FAF9F6', // Grey background for the box
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
          color: 'grey', // White text for contrast
        }}
      >
        Test {testNumber}
      </p>

      {/* Button */}
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: 'green', // White button
          color: 'white',
          
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer', // Pointer cursor on hover
        }}
        onClick={handleButtonClick} // Alert on button click
      >
Result
 </button>
    </div>
  );
};

export default ClickableButton;
