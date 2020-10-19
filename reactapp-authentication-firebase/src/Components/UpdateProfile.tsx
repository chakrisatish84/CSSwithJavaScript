import React, { useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { useAuth } from "../Context/AuthContext";
import { Link, useHistory } from "react-router-dom";

export default function UpdateProfile() {
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const { updateEmail, updatePassword, currentUser } = useAuth();

  const history = useHistory();

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    if (emailRef.current?.value) {
      if (passwordRef.current?.value !== confirmPasswordRef.current?.value) {
        setError("Password and confrim pasword do not match");
      } else {
        const promises = [];

        if (currentUser?.email !== emailRef.current.value) {
          promises.push(updateEmail(emailRef.current.value));
        }
        if (!!passwordRef.current?.value) {
          promises.push(updatePassword(passwordRef.current.value));
        }

        try {
          setError("");
          setLoading(true);
          Promise.all(promises)
            .then(() => {
              history.push("/");
            })
            .catch(() => {
              setError("Failed to Update an account");
            });
          //   history.push('/')
        } catch {
          setError("Failed to Update1 an account");
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
          <h2 className="text-center mb-4">Update Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                defaultValue={
                  !!currentUser ? currentUser.email?.toString() : ""
                }
                required
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Form.Group id="confPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                ref={confirmPasswordRef}
                placeholder="Leave blank to keep the same"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Update
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
       <Link to="/">Cancel</Link>
      </div>
    </>
  );
}
