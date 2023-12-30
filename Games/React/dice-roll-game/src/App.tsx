
import './App.css'
import { useEffect } from 'react'
import { dicePointerPosition } from './utils'

function App() {

  const randomSizeDice = (diceContainerRoot: Element, number: number) => {
    diceContainerRoot.innerHTML = ''
    for (let i = 0; i < number; i++) {

      const diceElement = document.createElement('div')
      diceElement.classList.add('diceElement')
      const diceDots = Math.floor((Math.random() * 6) + 1)
      for (const docPosition of dicePointerPosition[diceDots]) {
        const dotElement = document.createElement('div')
        dotElement.classList.add('dice-pointer')

        dotElement.style.setProperty('--left', docPosition[0] + '%')
        dotElement.style.setProperty('--top', docPosition[1] + '%')

        diceElement.appendChild(dotElement)
      }

      diceContainerRoot.appendChild(diceElement)
    }
  }
  useEffect(() => {
    const rolldiceButton = document.querySelector('.RoolDiceButton') as Element
    const diceContainer = document.querySelector('.dice-container') as Element
    randomSizeDice(diceContainer, 5)

    rolldiceButton.addEventListener('click', () => {
      const interval = setInterval(() =>
        randomSizeDice(diceContainer, 5), 50)

      setTimeout(() => clearInterval(interval), 500)
    })
  }, [])

  return (
    <section className="container">
      <main className="dice-container">
      </main>
      <footer>
        <button type="button" className="RoolDiceButton">RollDice</button>
      </footer>
    </section>
  )
}

export default App
