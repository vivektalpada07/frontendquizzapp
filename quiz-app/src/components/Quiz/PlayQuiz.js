import React, { useEffect, useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { QuizContext } from "../context/Quizcontext"; // Corrected path for QuizContext
import API from "../../services/api"; // Corrected path for API service

const PlayQuiz = () => {
  const { quizId } = useParams();
  const { questions, fetchQuizQuestions } = useContext(QuizContext);
  const [answers, setAnswers] = useState({});
  const [feedback, setFeedback] = useState(null);

  useEffect(() => {
    fetchQuizQuestions(quizId);
  }, [fetchQuizQuestions, quizId]);

  const handleSubmit = async () => {
    try {
      const response = await API.post(`/quizzes/${quizId}/submit`, answers);
      setFeedback(response.data.feedback);
    } catch (error) {
      console.error("Error submitting quiz:", error);
      setFeedback("An error occurred while submitting the quiz.");
    }
  };

  return (
    <div>
      <h2>Play Quiz</h2>
      {questions.map((q) => (
        <div key={q.id}>
          <h4>{q.questionText}</h4>
          {q.options.map((option) => (
            <div key={option}>
              <label>
                <input
                  type="radio"
                  name={q.id}
                  value={option}
                  onChange={(e) =>
                    setAnswers({ ...answers, [q.id]: e.target.value })
                  }
                />
                {option}
              </label>
            </div>
          ))}
        </div>
      ))}
      <button onClick={handleSubmit}>Submit</button>
      {feedback && <p>{feedback}</p>}
    </div>
  );
};

export default PlayQuiz;
