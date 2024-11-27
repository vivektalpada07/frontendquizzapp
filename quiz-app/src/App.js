import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Importing context providers
import AuthProvider from "./components/context/AuthContext";
import QuizProvider from "./components/context/Quizcontext";
// Importing components
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import QuizList from "./components/Quiz/Quizlist";
import PlayQuiz from "./components/Quiz/PlayQuiz";
import HomePage from "./components/Quiz/HomePage"; // Importing the new HomePage component

const App = () => {
  return (
    <AuthProvider>
      <QuizProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<QuizList />} />
            <Route path="/quizzes/:quizId" element={<PlayQuiz />} />
          </Routes>
        </Router>
      </QuizProvider>
    </AuthProvider>
  );
};

export default App;
