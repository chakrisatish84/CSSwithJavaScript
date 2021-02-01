import React, { useRef } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { v4 as uuid4 } from "uuid";

type LoginProps = {
  onIdSubmit: (
    value: string | undefined | ((prevVar: string) => string)
  ) => void;
};

export const Login = ({ onIdSubmit }: LoginProps) => {
  const idRef = useRef<HTMLInputElement>(null);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement | undefined>) => {
    e.preventDefault();
    onIdSubmit(idRef.current?.value);
  };

  const createNewID = () => {
    onIdSubmit(uuid4());
  };
  return (
    <Container
      className="align-items-center d-flex"
      style={{ height: "100vh" }}
    >
      <Form onSubmit={handelSubmit} className="w-100">
        <Form.Group>
          <Form.Label className="d-flex">Enter your Id</Form.Label>
          <Form.Control type="text" ref={idRef}></Form.Control>
        </Form.Group>
        <div className="d-flex">
          <Button type="submit" className="mr-2">
            Login
          </Button>
          <Button onClick={createNewID} variant="secondary" className="mr-2">
            Create a new id
          </Button>
        </div>
      </Form>
    </Container>
  );
};
