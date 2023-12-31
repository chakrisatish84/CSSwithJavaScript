
import { IProcessedStyleSet, styled } from '@fluentui/react'
import './App.css'
import { getClassNames, getCreditCardStyles, ICreditCardtStyles } from './App.styles'
import * as masterlogo from '../src/assets/mastercard.svg'
import { useEffect } from 'react'
import { handleKeyInput, handlePasteInput } from './utils'



const App = (props: any) => {
  const { styles, theme } = props;

  useEffect(() => {
    const expirationYearElement = document.querySelector('[data-expiration]') as Element
    expirationYearElement.innerHTML = ''
    // Add year list to Expiraton select input
    const currentYear = new Date().getFullYear()
    for (let i = currentYear; i < currentYear + 10; i++) {
      const optionElement = document.createElement('option')
      optionElement.innerText = i.toString();
      expirationYearElement?.appendChild(optionElement)
    }

    //Add event listner for keydown event
    document.addEventListener('keydown', handleKeyInput)
    return () => { document.removeEventListener('keydown', handleKeyInput) }
  }, [])

  useEffect(() => {
    //Add event listner for paste event
    document.addEventListener('paste', handlePasteInput)
    return () => { document.removeEventListener('paste', handlePasteInput) }
  }, [])

  const classNames: IProcessedStyleSet<ICreditCardtStyles> = getClassNames(styles, theme)
  return (
    <section className={classNames.root}>
      <form>
        <div className={`${classNames.cardRoot} ${classNames.cardFront}`}>
          <div className={classNames.cardHeader}>
            <div className={classNames.cardTitle}>
              <div>Sateesh Bank</div>
            </div>
            <div className={classNames.cardLogo}>
              <img alt='card Logo' data-logo src={masterlogo.default} />
            </div>
          </div>
          <div className={classNames.cardBody}>
            <fieldset className={classNames.fieldSet}>
              <legend>CARD Number</legend>
              <label htmlFor='cc-1'>CARD NUMBER</label>
              <div data-connected-inputs className={classNames.cardNumberRoot}>
                <input type='tel' id="cc-1" aria-label='Card first 4 digits' maxLength={4} required pattern='[0-9]{4}'></input>
                <input type='tel' aria-label='Card second 4 digits' maxLength={4} required pattern='[0-9]{4}'></input>
                <input type='tel' aria-label='Card third 4 digits' maxLength={4} required pattern='[0-9]{4}'></input>
                <input type='tel' aria-label='Card fourth 4 digits' maxLength={4} required pattern='[0-9]{4}'></input>
              </div>
            </fieldset>
            <div className={classNames.cardInputRow}>
              <div>
                <label htmlFor='cc-name'>Name</label>
                <div>
                  <input type='text' id="cc-name" aria-label='Card name'></input>
                </div>
              </div>
              <fieldset className={`${classNames.fieldSet} ${classNames.cardExpirationRoot}`}>
                <legend>EXPIRATION</legend>
                <label htmlFor='cc-expiration'>Expiration</label>
                <div className={classNames.cardExpirationInput}>
                  <select name="" id="cc-expiration" aria-label='expiration month'>
                    <option>01</option>
                    <option>02</option>
                    <option>03</option>
                    <option>04</option>
                    <option>05</option>
                    <option>06</option>
                    <option>07</option>
                    <option>08</option>
                    <option>09</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                  <select data-expiration aria-label='Epiration year'>
                  </select>
                </div>
              </fieldset>
            </div>
          </div>

        </div>
        <div className={`${classNames.cardBack} ${classNames.cardRoot}`}>
          <div className={classNames.cardStripe}></div>
          <div className={classNames.cardCVCRoot}>
            <label htmlFor='cc-cvc'>CVC</label>
            <input type='tel' id="cc-cvc" maxLength={3} required></input>
          </div>
        </div>
      </form>
    </section>
  )
}

export const StyledApp = styled(App, getCreditCardStyles)


