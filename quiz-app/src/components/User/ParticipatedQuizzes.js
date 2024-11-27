import React, { useEffect, useState } from "react";
import API from "../../services/api";
import { Link } from "react-router-dom";

const ParticipatedQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipatedQuizzes = async () => {
      try {
        const { data } = await API.get("/quizzes/participated"); // API endpoint to fetch participated quizzes
        setQuizzes(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching participated quizzes:", error);
        setLoading(false);
      }
    };

    fetchParticipatedQuizzes();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (quizzes.length === 0) {
    return <p>You haven't participated in any quizzes yet.</p>;
  }

  return (
    <div>
      <h2>Your Participated Quizzes</h2>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz.id}>
            <h3>{quiz.name}</h3>
            <p>
              <strong>Score:</strong> {quiz.score} / {quiz.totalQuestions}
            </p>
            <p>
              <strong>Status:</strong> {quiz.completed ? "Completed" : "In Progress"}
            </p>
            <Link to={`/quizzes/${quiz.id}`}>View Quiz Details</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipatedQuizzes;
