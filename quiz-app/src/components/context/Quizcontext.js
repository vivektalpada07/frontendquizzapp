import React, { createContext, useState } from "react";
import API from "../../services/api"; // Corrected path for API service

const QuizContext = createContext(); // Removed redundant `export` as it's handled at the end

const QuizProvider = ({ children }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [questions, setQuestions] = useState([]);

  const fetchQuizzes = async () => {
    try {
      const { data } = await API.get("/quizzes/all");
      setQuizzes(data);
    } catch (error) {
      console.error("Error fetching quizzes:", error);
    }
  };

  const fetchQuizQuestions = async (quizId) => {
    try {
      const { data } = await API.get(`/questions/quiz/${quizId}`);
      setQuestions(data);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  };

  return (
    <QuizContext.Provider
      value={{ quizzes, fetchQuizzes, questions, fetchQuizQuestions }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export { QuizContext }; // Named export for QuizContext
export default QuizProvider; // Default export for QuizProvider
