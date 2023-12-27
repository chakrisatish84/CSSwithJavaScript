const dicePointerPosition = {
    1: [[50, 50]],
    2: [
        [20, 20],
        [80, 80]
    ],
    3: [
        [20, 20],
        [50, 50],
        [80, 80]
    ],
    4: [
        [20, 20],
        [80, 80],
        [20, 80],
        [80, 20]
    ],
    5: [
        [20, 20],
        [80, 80],
        [50, 50],
        [20, 80],
        [80, 20]
    ],
    6: [
        [20, 20],
        [80, 80],
        [20, 80],
        [80, 20],
        [20, 50],
        [80, 50]
    ]
}

const rolldiceButton = document.querySelector('.RoolDiceButton')
const diceContainer = document.querySelector('.dice-container')

const randomSizeDice = (diceContainerRoot, number) => {
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
randomSizeDice(diceContainer, 5)

rolldiceButton.addEventListener('click', () => {
    const interval = setInterval(() =>
        randomSizeDice(diceContainer, 5), 50)

     setTimeout(()=> clearInterval(interval), 500)   
}
)


{/* <div class="diceElement">
<div class="dice-pointer"></div>
</div> */}