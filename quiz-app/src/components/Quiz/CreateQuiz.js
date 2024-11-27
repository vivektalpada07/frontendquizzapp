import React, { useState } from "react";
import API from "../../services/api";

const CreateQuiz = () => {
  const [quizName, setQuizName] = useState("");
  const [questions, setQuestions] = useState([{ questionText: "", options: [], correctAnswer: "" }]);

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...questions];
    if (field === "options") {
      updatedQuestions[index].options = value.split(","); // Assuming options are comma-separated
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([...questions, { questionText: "", options: [], correctAnswer: "" }]);
  };

  const handleSubmit = async () => {
    try {
      await API.post("/quizzes", { name: quizName, questions });
      alert("Quiz created successfully!");
      setQuizName("");
      setQuestions([{ questionText: "", options: [], correctAnswer: "" }]);
    } catch (error) {
      console.error("Error creating quiz:", error);
      alert("Failed to create quiz. Please try again.");
    }
  };

  return (
    <div>
      <h2>Create Quiz</h2>
      <div>
        <label>
          Quiz Name:
          <input
            type="text"
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />
        </label>
      </div>
      {questions.map((question, index) => (
        <div key={index}>
          <h4>Question {index + 1}</h4>
          <input
            type="text"
            placeholder="Question Text"
            value={question.questionText}
            onChange={(e) =>
              handleQuestionChange(index, "questionText", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Options (comma-separated)"
            value={question.options.join(",")}
            onChange={(e) =>
              handleQuestionChange(index, "options", e.target.value)
            }
          />
          <input
            type="text"
            placeholder="Correct Answer"
            value={question.correctAnswer}
            onChange={(e) =>
              handleQuestionChange(index, "correctAnswer", e.target.value)
            }
          />
        </div>
      ))}
      <button onClick={addQuestion}>Add Question</button>
      <button onClick={handleSubmit}>Create Quiz</button>
    </div>
  );
};

export default CreateQuiz;
