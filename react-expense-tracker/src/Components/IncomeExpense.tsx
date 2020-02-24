import React, { useContext } from "react";

import { GlobalContext } from "../context/globalContext";

export const IncomeExpense = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => {
    return transaction.amount;
  });

  const income = amounts
    .filter(amount => amount > 0)
    .reduce((acc, item) => (acc += item), 0);

    const expense = amounts
    .filter(amount => amount < 0)
    .reduce((acc, item) => (acc += item), 0);
  return (
    <div>
      <div className="inc-exp-container">
        <div>
          <h4>Income</h4>
          <p className="money plus">{income}</p>
        </div>
        <div>
          <h4>Expense</h4>
          <p className="money minus">{expense}</p>
        </div>
      </div>
    </div>
  );
};
