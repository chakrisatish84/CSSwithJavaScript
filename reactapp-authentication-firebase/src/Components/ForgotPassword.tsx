import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../Context/AuthContext";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const emailRef = useRef<HTMLInputElement>(null);

  const { resetPassword } = useAuth();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const handelResetPassword = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (emailRef.current) {
      try {
        setError("");
        setLoading(true);
        await resetPassword(emailRef.current.value);
        setMessage("Check your inbox for further instructions");
      } catch {
        setError("Failed to Reset Password");
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
          <h2 className="text-center mb-4">Password Reset</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handelResetPassword}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/Signup">Singup</Link>
      </div>
    </>
  );
}
