import React, { useState, useContext, useEffect, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { ContactModel, useContacts } from "./ContactsProivder";
import { useSocket } from "./SocketProvider";

export class MessageModel {
  sender!: string;
  message!: string;
  fromMe?: boolean = false;
  senderName?: string = "";
}

export class SendMessageModel {
  recepients!: ContactModel[];
  message!: string;
}

export class ConversationsModel {
  recepients!: ContactModel[];
  messages!: MessageModel[];
  selected!: boolean;
}
interface IConversationsContextProps {
  conversations: ConversationsModel[];
  selectedConversation: ConversationsModel | null;
  createConversation: (recepients: ContactModel[]) => void;
  setSelectedConversationIdex: Function;
  sendMessage: (sendMessageModel: SendMessageModel) => void;
}
const ConversationsContext = React.createContext<IConversationsContextProps>({
  conversations: [],
  selectedConversation: null,
  createConversation: () => undefined,
  setSelectedConversationIdex: () => null,
  sendMessage: (_sendMessageModel: SendMessageModel) => undefined,
});

export const useConversations = () => {
  return useContext(ConversationsContext);
};

type ConversationsProps = {
  id: string;
  children: React.ReactNode;
};
export const ConversationsProivder = ({ id, children }: ConversationsProps) => {
  const { contacts } = useContacts();
  const { socket } = useSocket();
  const [conversations, setconversations] = useLocalStorage<ConversationsModel>(
    "conversations",
    []
  );
  const [selectedConversationIdex, setSelectedConversationIdex] = useState(0);

  const createConversation = (recepients: ContactModel[]) => {
    setconversations((prevConversations: ConversationsModel[]) => {
      return [...prevConversations, { recepients, messages: [] }];
    });
  };

  const formattedConversations: ConversationsModel[] = conversations.map(
    (conversation: ConversationsModel, index: number) => {
      const recepients = !!conversation && conversation.recepients.map(
        (recepient: ContactModel) => {
          const contact = contacts.find((contact: ContactModel) => {
            return contact.id == recepient.id;
          });
          const name = (contact && contact.name) || recepient;
          return { id: recepient.id, name };
        }
      );
      const messages = !!conversation && conversation.messages.map((message: MessageModel) => {
        const contact = contacts.find((contact: ContactModel) => {
          return contact.id == message.sender;
        });
        const name = (contact && contact.name) || message.sender;
        const fromMe = id === message.sender;
        return { ...message, fromMe: fromMe, senderName: name };
      });
      const selected = index === selectedConversationIdex;
      return { ...conversation, messages, recepients, selected };
    }
  );

  const sendMessage = (sendMessageModel: SendMessageModel) => {
    socket?.emit("send-message", sendMessageModel);

    addMessageToConversation(sendMessageModel, id);
  };

  const addMessageToConversation = useCallback(
    (sendMessageModel: SendMessageModel, id: string) => {
      setconversations((prevConversations: ConversationsModel[]) => {
        let madeChange = false;
        const message = sendMessageModel.message;
        const recepients = sendMessageModel.recepients;
        const newMessage: MessageModel = { sender: id, message };
        const newConversations = prevConversations.map(
          (conversation: ConversationsModel) => {
            if (
              arrayEquality(
                conversation.recepients,
                sendMessageModel.recepients
              )
            ) {
              madeChange = true;
              return {
                ...conversation,
                messages: [...conversation.messages, newMessage],
              };
            }
          }
        );
        if (madeChange) {
          return newConversations;
        } else {
          return [...prevConversations, { recepients, messages: [newMessage] }];
        }
      });
    },
    [setconversations]
  );

  useEffect(() => {
    if (!!socket) {
      socket.on("receive-message", addMessageToConversation);
      return () => {
        socket.off("receive-message");
      };
    } else {
      return;
    }
  }, [socket, addMessageToConversation]);

  const arrayEquality = (a: ContactModel[], b: ContactModel[]) => {
    if (a.length !== b.length) {
      return false;
    }

    a.sort();
    b.sort();

    return a.every((element: ContactModel, index: number) => {
      return element.id === b[index].id;
    });
  };

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIdex],
    createConversation: createConversation,
    setSelectedConversationIdex: setSelectedConversationIdex,
    sendMessage: sendMessage,
  };
  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};
