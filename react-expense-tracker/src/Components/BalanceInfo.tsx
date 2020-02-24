import React, {useContext} from "react";
import { GlobalContext} from '../context/globalContext'

export const BalanceInfo = () => {
  const {transactions} = useContext(GlobalContext)

  const amounts = transactions.map(transaction => {return transaction.amount})
  const total = amounts.reduce((acc,item)=> (acc += item),0).toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1>${total}</h1>
    </>
  );
};
