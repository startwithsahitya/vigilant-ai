import React, { useState } from 'react';

const QuestionList: React.FC = () => {
  const totalQuestions = 15; // Total number of questions
  const [completedQuestions, setCompletedQuestions] = useState<boolean[]>(
    Array(totalQuestions).fill(false) // Array to track completed questions
  );
  const [currentQuestion, setCurrentQuestion] = useState(0); // Track the current question
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false); // Submit button state

  const handleQuestionClick = (index: number) => {
    if (isSubmitDisabled) return; // Disable interaction after submit
    if (!completedQuestions[index]) {
      // Mark question as completed
      const updatedQuestions = [...completedQuestions];
      updatedQuestions[index] = true;
      setCompletedQuestions(updatedQuestions);
    }
    setCurrentQuestion(index); // Update the current question
  };

  const handleNextClick = () => {
    if (isSubmitDisabled) return; // Disable interaction after submit
    if (currentQuestion < totalQuestions - 1) {
      const updatedQuestions = [...completedQuestions];
      updatedQuestions[currentQuestion] = true; // Mark the current question as completed
      setCompletedQuestions(updatedQuestions);
      setCurrentQuestion(currentQuestion + 1); // Move to the next question
    }
  };

  const handleSubmitClick = () => {
    setIsSubmitDisabled(true); // Disable all interactions after submit
    alert('Submit button clicked!'); // Show alert on submit
  };

  return (
    <div
      style={{
        width: '372px',
        height: '716px',
        border: '2px solid #000', // Border for visibility
        padding: '16px',
        backgroundColor: '#f5f5f5', // Light background color
        borderRadius: '8px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      {/* Title */}
      <h2
        style={{
          margin: '0 0 20px',
          textAlign: 'center',
          fontSize: '18px',
          fontWeight: 'bold',
        }}
      >
        Question List
      </h2>

      {/* Question Boxes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)', // 5 columns
          gap: '10px', // Space between squares
          marginBottom: 'auto', // Align at the top
        }}
      >
        {Array.from({ length: totalQuestions }, (_, index) => (
          <div
            key={index}
            onClick={() => handleQuestionClick(index)} // Navigate to question on click
            style={{
              width: '60px',
              height: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: '5px',
              backgroundColor: completedQuestions[index] ? 'green' : 'white', // Green for completed, white otherwise
              color: completedQuestions[index] ? 'white' : 'black', // Adjust text color for visibility
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: isSubmitDisabled ? 'not-allowed' : 'pointer', // Disable cursor if submitted
              border: '1px solid #ccc', // Border for better visibility
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Button Section */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between', // Buttons aligned left and right
          marginTop: '20px',
        }}
      >
        {/* Submit Button */}
        <button
          style={{
            width: '132px',
            height: '44px',
            backgroundColor: isSubmitDisabled ? '#cccccc' : 'green', // Gray when disabled, green otherwise
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
          }}
          onClick={handleSubmitClick}
          disabled={isSubmitDisabled} // Disable button after first click
        >
          Submit
        </button>

        {/* Next Button */}
        <button
          style={{
            width: '132px',
            height: '44px',
            backgroundColor: isSubmitDisabled ? '#cccccc' : 'white',
            color: isSubmitDisabled ? '#666' : 'black', 
            border: 'none',
            borderRadius: '5px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: isSubmitDisabled ? 'not-allowed' : 'pointer',
          }}
          onClick={handleNextClick}
          disabled={isSubmitDisabled} // Disable button after submit
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionList;
