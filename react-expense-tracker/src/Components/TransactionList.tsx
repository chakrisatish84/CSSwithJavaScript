import React, {useContext} from "react";
import { Transaction } from "./Transaction";
import { GlobalContext} from '../context/globalContext'

export const Transactions = () => {
const {transactions} = useContext(GlobalContext);


  return (
    <>
      <h3>History</h3>
      <ul className="list">
        {transactions.map((transaction,index) => {
          return <Transaction key={index} transaction={transaction} />
        })}
      </ul>
    </>
  );
};
