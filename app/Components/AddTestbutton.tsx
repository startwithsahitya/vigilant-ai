import React from 'react';

const ClickableButton: React.FC = () => {
  const handleButtonClick = () => {
    alert('Button clicked!');
  };

  return (
    <div
      style={{
        width: '224px',
        height: '208px',
        backgroundColor: '#FAF9F6', // Grey background for the box
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '0px', // Rounded corners for the box
        border: '1px solid #ccc',
      }}
    >
      <button
        style={{
          width: '134px',
          height: '44px',
          backgroundColor: 'white', // White button
          color: 'black',
         
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: 'pointer', // Pointer cursor on hover
        }}
        onClick={handleButtonClick} // Alert on button click
      >
        Add Test
      </button>
    </div>
  );
};

export default ClickableButton;
