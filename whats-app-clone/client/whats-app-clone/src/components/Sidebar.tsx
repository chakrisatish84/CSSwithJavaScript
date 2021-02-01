import React, { useState } from "react";
import { Button, Nav, Tab, Modal } from "react-bootstrap";
import { Contacts } from "./Contacts";
import { Convesations } from "./Convesations";
import { NewContact } from "./NewContact";
import { NewConversation } from "./NewConversation";

type SidebarProps = {
  id: string;
};

const CONVERSATION_KEY = "Conversations";
const CONTACTS_KEY = "Contacts";
export const Sidebar = ({ id }: SidebarProps) => {
  const [activeKey, setActiveKey] = useState<string | null>(CONVERSATION_KEY);
  const [modalOpen, setModelOpen] = useState<boolean>(false);

  const conversationOpen = activeKey === CONVERSATION_KEY ? true : false;

  const closeModal = (): void => {
    setModelOpen(false);
  };
  return (
    <div style={{ width: "250px" }} className="d-flex flex-column">
      <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
        <Nav variant="tabs" className="justify-content-center">
          <Nav.Item>
            <Nav.Link eventKey={CONVERSATION_KEY}>Conversation</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey={CONTACTS_KEY}>Contacts</Nav.Link>
          </Nav.Item>
        </Nav>
        <Tab.Content className="border-right flex-grow-1 overflow-auto">
          <Tab.Pane eventKey={CONVERSATION_KEY}>
            <Convesations />
          </Tab.Pane>
          <Tab.Pane eventKey={CONTACTS_KEY}>
            <Contacts />
          </Tab.Pane>
        </Tab.Content>
        <div className="p-2 border-top border-right small">
          Your Id: <span className="text-muted">{id}</span>
        </div>
        <Button onClick={() => setModelOpen(true)} className="rounded-0">
          New {conversationOpen ? "Conversation" : "Contact"}{" "}
        </Button>
      </Tab.Container>
      <Modal show={modalOpen} onhide={closeModal}>
        {conversationOpen ? (
          <NewConversation closeModal={closeModal} />
        ) : (
          <NewContact closeModal={closeModal} />
        )}
      </Modal>
    </div>
  );
};
