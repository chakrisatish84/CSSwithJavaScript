import React from "react";
import "./App.css";
import { Header } from "./Components/Header";
import { BalanceInfo } from "./Components/BalanceInfo";
import { Transactions } from "./Components/TransactionList";
import { AddTransaction } from "./Components/AddTransaction";
import { IncomeExpense } from "./Components/IncomeExpense";
import {GlobalProvider} from "./context/globalContext"

function App() {
  return (
    <GlobalProvider>
      <Header title={"Expense Tracker"} />
      <div className="container">
        <BalanceInfo />
        <IncomeExpense />
        <Transactions />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default App;
