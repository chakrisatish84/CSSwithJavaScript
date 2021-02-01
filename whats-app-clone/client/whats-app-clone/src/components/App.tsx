import React from "react";
import "../App.css";
import { ContactsProivder } from "../Contexts/ContactsProivder";
import { ConversationsProivder } from "../Contexts/ConversationsProivder";
import { SocketProvider } from "../Contexts/SocketProvider";
import { useLocalStorage } from "../hooks/useLocalStorage";
import Dashboard from "./Dashboard";
import { Login } from "./Login";

function App() {
  const [id, setId] = useLocalStorage("id");
  const dashboard = (
    <SocketProvider id={id}>
      <ContactsProivder>
        <ConversationsProivder id={id}>
          <Dashboard id={id} />
        </ConversationsProivder>
      </ContactsProivder>
    </SocketProvider>
  );
  return <div>{id ? dashboard : <Login onIdSubmit={setId} />}</div>;
}

export default App;
