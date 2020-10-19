import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

export default function Login() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const { signup, login } = useAuth();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();

  const handelLogin = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (emailRef.current && passwordRef.current) {
      try {
        setError("");
        setLoading(true);
        await login(emailRef.current.value, passwordRef.current.value);
        history.push("/");
      } catch {
        setError("Failed to Login");
      }
      setLoading(false);
    } else {
      setError("Invalid credentials");
    }
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handelLogin}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log in
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/Signup">Singup</Link>
      </div>
    </>
  );
}
