import React from "react";
import { ListGroup } from "react-bootstrap";
import {
  ConversationsModel,
  useConversations,
} from "../Contexts/ConversationsProivder";

export const Convesations = () => {
  const { conversations, setSelectedConversationIdex } = useConversations();
  return (
    <ListGroup variant="flush">
      {!!conversations ? (
        conversations.map((conversation: ConversationsModel, index: number) => {
          return (
            <ListGroup.Item
              key={index}
              action
              onClick={() => setSelectedConversationIdex(index)}
              active={conversation.selected}
            >
              {conversation.recepients.map((r) => r.name).join(", ")}
            </ListGroup.Item>
          );
        })
      ) : (
        <></>
      )}
    </ListGroup>
  );
};
