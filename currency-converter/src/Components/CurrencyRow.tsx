import React from "react";

type HtmlEvent = React.ChangeEvent<HTMLSelectElement>

type HtmlInputEvent = React.ChangeEvent<HtmlInputEvent>

type CurrencyRowProps = {
  currencyOptions: string[];
  selectedCurrency: string | undefined;
  amount:any;
  onCurrencySelectionChnange?: (e:HtmlEvent) => void;
  onAmmountChnage?:(e:any) => void;
};
export default function CurrencyRow(props: CurrencyRowProps) {
  const {
    currencyOptions,
    selectedCurrency,
    amount,
    onCurrencySelectionChnange,
    onAmmountChnage
  } = props;
  return (
    <div>
      <input type="text" className="currencyInput" value={amount} onChange={onAmmountChnage} />
      <select
        value={selectedCurrency}
        name="country"
        className="countryDropdown"
        id="curCountry"
        onChange={onCurrencySelectionChnange}
      >
        {currencyOptions &&
          currencyOptions.map((option1: string) => {
            return (
              <option key={option1} value={option1}>
                {option1}
              </option>
            );
          })}
      </select>
    </div>
  );
}
