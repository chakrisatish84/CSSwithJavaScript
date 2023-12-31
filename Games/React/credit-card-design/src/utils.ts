import * as masterlogo from '../src/assets/mastercard.svg'
import * as visalogo from '../src/assets/visa-logo.svg'

export const isConnectedInput = (input: HTMLInputElement): boolean => {
    const parent = input.closest('[data-connected-inputs]')
    return input.matches('input') && parent !== null
}

export const handlePasteInput = (event: ClipboardEvent) => {
    const input = event.target as HTMLInputElement
    const data = event.clipboardData?.getData('text') as string

    event.stopPropagation();
    event.preventDefault();

    if (!isConnectedInput(input)) return

    if (!data.match(/^[0-9]+$/)) return event.preventDefault()

    event.preventDefault()
    onInputChange(input, data)
}


export const handleKeyInput = (event: KeyboardEvent) => {
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

export const onInputChange = (input: HTMLInputElement, key: string) => {
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

export const focusInput = (input: HTMLInputElement, newValueLength: number) => {
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

