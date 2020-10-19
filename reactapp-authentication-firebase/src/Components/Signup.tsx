import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function Signup() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { signup } = useAuth();

  const history = useHistory();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current && confirmPasswordRef.current) {
      if (passwordRef.current.value !== confirmPasswordRef.current.value) {
        setError("Password and confrim pasword do not match");
      } else {
        try {
          setError("");
          setLoading(true);
          await signup(emailRef.current.value, passwordRef.current.value);
          history.push('/')
        } catch {
          setError("Failed to create an account");
        }
        setLoading(false);
      }
    } else {
      setError("Email and Password Requried");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sing Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="confPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control type="password" ref={confirmPasswordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sing Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Aleready have an account? <Link to="/Login">Login</Link>
      </div>
    </>
  );
}
