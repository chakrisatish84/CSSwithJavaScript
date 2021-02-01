import React, { useState } from "react";
import { Container, Form, Button, Modal } from "react-bootstrap";
import { ContactModel, useContacts } from "../Contexts/ContactsProivder";
import { useConversations } from "../Contexts/ConversationsProivder";

type NewConversationProps = {
  closeModal: () => void;
};
export const NewConversation = ({ closeModal }: NewConversationProps) => {
  const { contacts } = useContacts();
  const { conversations, createConversation } = useConversations();
  const [selectedContacts, setselectedContacts] = useState<ContactModel[]>([]);

  const handelSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createConversation(selectedContacts);
    closeModal();
  };

  const handleCheckboxChange = (contact: ContactModel) => {
    setselectedContacts((prevSelectedContacts: ContactModel[]) => {
      if (prevSelectedContacts.includes(contact)) {
        return prevSelectedContacts.filter((prevcontact: ContactModel) => {
          return contact.id != prevcontact.id;
        });
      }
      return [...prevSelectedContacts, contact];
    });
  };
  return (
    <>
      <Modal.Header closeButton onHide={closeModal}>
        Create Conversation
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handelSubmit} className="w-100">
          {contacts.map((contact: ContactModel) => {
            return (
              <Form.Group key={contact.id} controlId={contact.id}>
                <Form.Check
                  type="checkbox"
                  checked={selectedContacts.includes(contact)}
                  label={contact.name}
                  onChange={() => handleCheckboxChange(contact)}
                />
              </Form.Group>
            );
          })}
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
