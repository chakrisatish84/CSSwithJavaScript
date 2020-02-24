import React, {useContext} from "react";
import { ITransactionItems, GlobalContext } from "../context/globalContext";

type TransactionProps={
  transaction: ITransactionItems
}
export const Transaction = ({transaction}:TransactionProps) => {
  const sign = transaction.amount >0 ? '+'  : '-'
  const {deleteTransaction} = useContext(GlobalContext)
  return (
    <div>
      <li className={transaction.amount <0 ? 'plus'  : 'minus'}>
        Cash <span>{sign}${Math.abs(transaction.amount)}</span>
        <button className="delete-btn" onClick={()=> deleteTransaction && deleteTransaction(transaction.id)}></button>
      </li>
    </div>
  );
};
