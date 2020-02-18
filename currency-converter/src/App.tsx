import React, { useEffect, useState } from "react";
import "./App.css";
import CurrencyRow from "./Components/CurrencyRow";

type options = {
  key: string;
  text: string;
};

type HtmlEvent = React.ChangeEvent<HTMLSelectElement>;

export interface ICurrencyData {
  base: string;
  rates: options[];
}
const App = () => {
  const BASE_URL = "https://api.exchangeratesapi.io/latest";

  const [currencyOptions, setCurrencyOptions] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState<string>();
  const [toCurrency, setToCurrency] = useState<any>();
  const [amount, setAmount] = useState(1);
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const [exchangeRate, setExchangeRate] = useState();

  let fromAmount, toAmmount;
  if (amountInFromCurrency) {
    fromAmount = amount;
    toAmmount = amount * exchangeRate;
  } else {
    toAmmount = amount;
    fromAmount = amount / exchangeRate;
  }

  useEffect(() => {
    if (fromCurrency !== undefined && toCurrency !== undefined) {
      fetch(`${BASE_URL}?base=${fromCurrency}&symbols=${toCurrency}`)
        .then(res => res.json())
        .then((data: ICurrencyData) => {
          setExchangeRate(data.rates[toCurrency]);
        });
    }
  }, [fromCurrency, toCurrency]);

  useEffect(() => {
    fetch(BASE_URL)
      .then(res => res.json())
      .then((data: ICurrencyData) => {
        setCurrencyOptions([data.base, ...Object.keys(data.rates)]);
        setFromCurrency(data.base);
        const firstCurrency: any = [...Object.keys(data.rates)][0];
        setToCurrency(firstCurrency);
        setExchangeRate(data.rates[firstCurrency]);
      });
  }, []);

  const _onFromAmountChange = (e: any) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(true);
  };

  const _onToAmountChange = (e: any) => {
    setAmount(e.target.value);
    setAmountInFromCurrency(false);
  };
  return (
    <>
      <h1>Convert</h1>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={fromCurrency}
        amount={fromAmount}
        onCurrencySelectionChnange={(e: HtmlEvent) =>
          setFromCurrency(e.target.value)
        }
        onAmmountChnage={_onFromAmountChange}
      />
      <div className="equals">=</div>
      <CurrencyRow
        currencyOptions={currencyOptions}
        selectedCurrency={toCurrency}
        amount={toAmmount}
        onCurrencySelectionChnange={(e: HtmlEvent) =>
          setToCurrency(e.target.value)
        }
      />
    </>
  );
};

export default App;
