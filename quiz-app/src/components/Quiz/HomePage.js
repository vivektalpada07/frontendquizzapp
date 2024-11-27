import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <Container fluid className="p-5 bg-light">
      <Row className="text-center mb-4">
        <Col>
          <h1>Welcome to Quiz App</h1>
          <p>Test your knowledge with our exciting quizzes!</p>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col md={6} className="text-center mb-3">
          <h3>New User?</h3>
          <p>Create an account and get started with our quizzes.</p>
          <Link to="/register">
            <Button variant="primary">Register</Button>
          </Link>
        </Col>
        <Col md={6} className="text-center">
          <h3>Returning User?</h3>
          <p>Log in to continue your quiz journey.</p>
          <Link to="/login">
            <Button variant="success">Login</Button>
          </Link>
        </Col>
      </Row>
      <Row className="text-center">
        <Col>
          <Link to="/dashboard">
            <Button variant="info" size="lg">
              Explore Quizzes
            </Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
