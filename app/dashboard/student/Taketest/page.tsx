"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // For getting query params and navigation
import styles from "./Testpage.module.css";

const Taketest = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const testName = searchParams.get("id");

  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: "4",
    },
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Shakespeare", "Dickens", "Austen", "Hemingway"],
      correctAnswer: "Shakespeare",
    },
    {
      question: "What is the largest ocean on Earth?",
      options: ["Atlantic", "Indian", "Arctic", "Pacific"],
      correctAnswer: "Pacific",
    },
    {
      question: "Who painted the Mona Lisa?",
      options: ["Van Gogh", "Picasso", "Da Vinci", "Monet"],
      correctAnswer: "Da Vinci",
    },
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null);

  const handleOptionChange = (selectedOption: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = selectedOption;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = async () => {
    let calculatedScore = 0;

    questions.forEach((question, index) => {
      if (answers[index] === question.correctAnswer) {
        calculatedScore += 1;
      }
    });

    setScore(calculatedScore);

    try {
      const response = await fetch("/api/submitTest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testName,
          totalScore: calculatedScore,
        }),
      });

      if (response.ok) {
        alert("Test submitted successfully!");
        router.push("/dashboard/student"); // Redirect after successful submission
      } else {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong!");
      }
    } catch (error) {
      console.error("Error submitting the test:", error);
      alert("An error occurred while submitting the test.");
    }
  };

  return (
    <div className={styles.testPageContainer}>
      <div className={styles.testContent}>
        <div className={styles.testHeader}>
          <h2>{testName || "Test Name"}</h2>
        </div>

        <div className={styles.testQuestion}>
          <div className={styles.questionCard}>
            <p className={styles.question}>
              {currentQuestionIndex + 1}. {questions[currentQuestionIndex].question}
            </p>
            <div className={styles.options}>
              {questions[currentQuestionIndex].options.map((option) => (
                <div key={option} className={styles.option}>
                  <input
                    type="radio"
                    id={`q${currentQuestionIndex}_option_${option}`}
                    name={`q${currentQuestionIndex}`}
                    value={option}
                    checked={answers[currentQuestionIndex] === option}
                    onChange={() => handleOptionChange(option)}
                    className={styles.radioInput}
                  />
                  <label
                    htmlFor={`q${currentQuestionIndex}_option_${option}`}
                    className={styles.optionLabel}
                  >
                    {option}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.navigationButtons}>
          <button
            className={styles.navigationButton}
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          {currentQuestionIndex === questions.length - 1 ? (
            <button className={styles.submitButton} onClick={handleSubmit}>
              Submit
            </button>
          ) : (
            <button className={styles.navigationButton} onClick={handleNext}>
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taketest;
