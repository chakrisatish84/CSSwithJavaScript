import React, { useContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

export class ContactModel {
  id!: string;
  name!: string;
}
interface IContactContextProps {
  contacts: ContactModel[];
  createContact: Function;
}
const contactContext = React.createContext<IContactContextProps>({
  contacts: [],
  createContact: (id: string, name: string) => {
    return [];
  },
});

export const useContacts = () => {
  return useContext(contactContext);
};

type ContactsProps = {
  children: React.ReactNode;
};
export const ContactsProivder = ({ children }: ContactsProps) => {
  const [contacts, setContacts] = useLocalStorage<ContactModel>("contacts", []);
  const createContact = (id: string, name: string) => {
    setContacts((prevContacts: ContactModel[]) => {
      return [...prevContacts, { id, name }];
    });
  };

  const value = {
    contacts: contacts,
    createContact: createContact,
  };
  return (
    <contactContext.Provider value={value}>{children}</contactContext.Provider>
  );
};
