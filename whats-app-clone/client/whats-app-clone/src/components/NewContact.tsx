import React, { useRef } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { useContacts } from "../Contexts/ContactsProivder";

type NewContactProps = {
  closeModal: () => void;
};
export const NewContact = ({ closeModal }: NewContactProps) => {
  const idRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const { createContact } = useContacts();
  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createContact(idRef.current?.value, nameRef.current?.value);
    closeModal();
  };
  return (
    <>
      <Modal.Header closeButton onHide={closeModal}>
        Create Contact
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handelSubmit} className="w-100">
          <Form.Group>
            <Form.Label className="d-flex">Id</Form.Label>
            <Form.Control type="text" ref={idRef}></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Label className="d-flex">Name</Form.Label>
            <Form.Control type="text" ref={nameRef}></Form.Control>
          </Form.Group>
          <div className="d-flex">
            <Button type="submit" className="mr-2">
              Create
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};
