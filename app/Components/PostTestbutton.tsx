import React from 'react';

const TwoButtonComponent: React.FC = () => {
  const handleButtonClick = (buttonNumber: number) => {
    alert(`Button ${buttonNumber} clicked!`);
  };

  return (
    <div
      style={{
        width: '224px',
        height: '208px',
        backgroundColor: '#FAF9F6', 
        display: 'flex',
        flexDirection: 'column', 
        justifyContent: 'center',
        alignItems: 'center',
        padding: '10px', 
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontSize: '18px',
          fontWeight: 'bold',
          marginBottom: '20px', 
          color: 'grey', 
        }}
      >
        Test 1
      </h3>

      {/* Buttons */}
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: 'white', // White button
          color: 'black',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer', // Pointer cursor on hover
          marginBottom: '10px', // Space between the two buttons
        }}
        onClick={() => handleButtonClick(1)} // Handle click for Button 1
      >
        Edit
      </button>
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: '#3498db', // White button
          color: 'black',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer', // Pointer cursor on hover
        }}
        onClick={() => handleButtonClick(2)} // Handle click for Button 2
      >Post
      </button>
    </div>
  );
};

export default TwoButtonComponent;
