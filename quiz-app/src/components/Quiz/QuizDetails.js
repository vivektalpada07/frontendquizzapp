import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../../services/api";

const QuizDetails = () => {
  const { quizId } = useParams(); // Extract quizId from the URL
  const [quiz, setQuiz] = useState(null); // State to store quiz details
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const { data } = await API.get(`/quizzes/${quizId}`);
        setQuiz(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz details:", error);
        setLoading(false);
      }
    };

    fetchQuizDetails();
  }, [quizId]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!quiz) {
    return <p>Quiz not found.</p>;
  }

  return (
    <div>
      <h2>Quiz Details</h2>
      <h3>{quiz.name}</h3>
      <div>
        {quiz.questions.map((question, index) => (
          <div key={index}>
            <h4>
              Question {index + 1}: {question.questionText}
            </h4>
            <ul>
              {question.options.map((option, idx) => (
                <li key={idx}>{option}</li>
              ))}
            </ul>
            <p>
              <strong>Correct Answer:</strong> {question.correctAnswer}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizDetails;
