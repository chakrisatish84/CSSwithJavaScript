import React, { useReducer, createContext } from "react";
import AppReucer from "./AppReducer";

export interface ITransactionItems {
  id: string;
  text: string;
  amount: number;
}

export interface ITransaction {
  transactions: ITransactionItems[];
  deleteTransaction?: (id: string) => void;
}

const transactionsItems: ITransactionItems[] = [
  { id: "1", text: "Flower", amount: -20 },
  { id: "2", text: "Salaray", amount: 300 },
  { id: "3", text: "Book", amount: -10 },
  { id: "4", text: "Camera", amount: 150 }
];

export const initialState: ITransaction = {
  transactions: transactionsItems
};

// Create a context
export const GlobalContext = createContext(initialState);

//create a provider component
export const GlobalProvider = (props: any) => {
  const [state, dispatch] = useReducer(AppReucer, initialState);

  //Actions:
  function deleteTransaction(id: string) {
    dispatch({
      type: "DELETE_TRANSACTION",
      payload: id
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        deleteTransaction
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
