
import { IProcessedStyleSet, styled } from '@fluentui/react'
import './App.css'
import { getClassNames, getCreditCardStyles, ICreditCardtStyles } from './App.styles'
import * as masterlogo from '../src/assets/mastercard.svg'
import * as visalogo from '../src/assets/visa-logo.svg'
import { useEffect } from 'react'



const App = (props: any) => {
  const isConnectedInput = (input: HTMLInputElement): boolean => {
    const parent = input.closest('[data-connected-inputs]')
    return input.matches('input') && parent !== null
  }

  const handleKeyInput = (event: KeyboardEvent) => {
    const input = event.target as HTMLInputElement
    if (!(isConnectedInput(input))) return
    switch (event.key) {
      case "ArrowLeft": {
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd
        if (selectionStart === 0 && selectionEnd === 0) {
          const prevElement = input.previousElementSibling as HTMLInputElement
          if (prevElement !== null) {
            prevElement.focus()
            prevElement.selectionStart = prevElement.value.length
            prevElement.selectionEnd = prevElement.value.length
            event.preventDefault()
          }
        }
        break;
      }
      case "ArrowRight": {
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd
        if (selectionStart === input.value.length && selectionEnd === input.value.length) {
          const nextElement = input.nextElementSibling as HTMLInputElement
          if (nextElement !== null) {
            nextElement.focus()
            nextElement.selectionStart = 0
            nextElement.selectionEnd = 0
          }
          event.preventDefault()

        }
        break;
      }
      case "Delete": {
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd
        if (selectionStart === input.value.length && selectionEnd === input.value.length) {
          const nextElement = input.nextElementSibling as HTMLInputElement
          if (nextElement !== null) {
            nextElement.value = nextElement.value.substring(1, nextElement.value.length)
            nextElement.focus()
            nextElement.selectionStart = 0
            nextElement.selectionEnd = 0
          }
          event.preventDefault()

        }
        break;
      }
      case "Backspace": {
        const selectionStart = input.selectionStart;
        const selectionEnd = input.selectionEnd
        if (selectionStart === 0 && selectionEnd === 0) {
          const prevElement = input.previousElementSibling as HTMLInputElement
          if (prevElement !== null) {
            prevElement.value = prevElement.value.substring(0, prevElement.value.length - 1)
            prevElement.focus()
            prevElement.selectionStart = prevElement.value.length
            prevElement.selectionEnd = prevElement.value.length
            event.preventDefault()
          }
        }
        break;
      }
      default: {
        if (event.ctrlKey || event.altKey) return
        if (event.key.length > 1) return
        if (event.key.match(/^[^0-9]$/)) {
          event.preventDefault()
          return
        }

        event.preventDefault()
        onInputChange(input, event.key);
      }
    }
  }

  const onInputChange = (input: HTMLInputElement, key: string) => {
    const selectionStart = input.selectionStart as number
    const selectionEnd = input.selectionEnd as number
    updateInputValue(input, key, selectionStart, selectionEnd)
    focusInput(input, key.length + selectionStart)

    const logoElement = document.querySelector('[data-logo]') as HTMLImageElement

    const firstFour = input.closest('[data-connected-inputs]')?.querySelector('input')?.value

    if (firstFour?.startsWith('5')) {
      logoElement.src = `${masterlogo.default}`
    }
    else if (firstFour?.startsWith('4')) {
      logoElement.src = `${visalogo.default}`
    }
  }

  const focusInput = (input: HTMLInputElement, newValueLength: number) => {
    let addedChars = newValueLength
    let currentInput = input

    while (addedChars > 4 && currentInput.nextElementSibling != null) {
      addedChars -= 4
      currentInput = currentInput.nextElementSibling as HTMLInputElement
    }

    if (addedChars > 4) addedChars = 4 // after looping and we are having more items and no next sibiling, then to show focus at the last element

    currentInput.focus();
    currentInput.selectionStart = addedChars
    currentInput.selectionEnd = addedChars
  }

  const updateInputValue = (input: HTMLInputElement, key: string, selectionStart = 0, selectionEnd = 0) => {
    const newValue = `${input.value.substring(0, selectionStart)}${key}${input.value.substring(selectionEnd, 4)}`
    input.value = newValue.substring(0, 4)
    if (parseInt(newValue) > 4) {
      const nextElement = input.nextElementSibling as HTMLInputElement
      if (nextElement === null) return
      updateInputValue(nextElement, newValue.substring(4))
    }
  }

  const handlePasteInput = (event: ClipboardEvent) => {
    const input = event.target as HTMLInputElement
    const data = event.clipboardData?.getData('text') as string

    event.stopPropagation();
    event.preventDefault();

    if (!isConnectedInput(input)) return

    if (!data.match(/^[0-9]+$/)) return event.preventDefault()

    event.preventDefault()
    onInputChange(input, data)
  }
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
    //Add event listner for keydown event
    document.addEventListener('paste', handlePasteInput)
    return () => { document.removeEventListener('paste', handlePasteInput) }
  }, [])
  // const logo = require('./assets/mastercard.svg')
  const { styles, theme } = props;
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


