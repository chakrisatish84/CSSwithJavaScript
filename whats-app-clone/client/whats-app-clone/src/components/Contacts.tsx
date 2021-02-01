import React from "react";
import { ListGroup } from "react-bootstrap";
import { ContactModel, useContacts } from "../Contexts/ContactsProivder";

export const Contacts = () => {
  const { contacts } = useContacts();
  return (
    <ListGroup variant="flush">
      {contacts.map((contact: ContactModel) => {
        return <ListGroup.Item key={contact.id}>{contact.name}</ListGroup.Item>;
      })}
    </ListGroup>
  );
};
