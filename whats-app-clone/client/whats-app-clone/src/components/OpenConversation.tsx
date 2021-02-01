import React, { useState, useCallback } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import {
  MessageModel,
  SendMessageModel,
  useConversations,
} from "../Contexts/ConversationsProivder";

export const OpenConversation = () => {
  const [message, setMessage] = useState<string>("");

  const setRef = useCallback((node: HTMLDivElement) => {
    if (node) {
      node.scrollIntoView();
    }
  }, []);

  const { selectedConversation, sendMessage } = useConversations();

  const inputMessageChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(ev.currentTarget.value);
  };
  const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const sendMessageModel: SendMessageModel = {
      recepients: selectedConversation
        ? selectedConversation?.recepients.map((r) => r)
        : [],
      message: message,
    };
    sendMessage(sendMessageModel);
    setMessage("");
  };
  return (
    <div className="d-flex flex-column flex-grow-1">
      <div className="flex-grow-1 overflow-auto">
        <div className="d-flex flex-column align-items-start justify-content-end px-3">
          {selectedConversation?.messages.map(
            (message: MessageModel, index) => {
              const lastMessage =
                selectedConversation.messages.length - 1 === index;
              return (
                <div
                  ref={lastMessage ? setRef : null}
                  key={index}
                  className={`my-1 d-flex flex-column ${
                    message.fromMe ? "align-self-end" : ""
                  }`}
                >
                  <div
                    className={`rounded px-2 py-1 ${
                      message.fromMe ? "bg-primary text-white" : "broder"
                    }`}
                  >
                    {message.message}
                  </div>
                  <div
                    className={`text-muted small ${
                      message.fromMe ? "text-right" : ""
                    }`}
                  >
                    {message.fromMe ? "You" : message.senderName}
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="m-2">
          <InputGroup>
            <Form.Control
              as="textarea"
              value={message}
              onChange={inputMessageChange}
              style={{ height: "75px", resize: "none" }}
            />
            <InputGroup.Append>
              <Button type="submit">Send</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
};
