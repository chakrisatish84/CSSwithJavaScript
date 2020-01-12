const X_Class = "x";
const Circle_Class = "circle";
const cellElements = document.querySelectorAll("[data-cell]");
const boardElement = document.querySelector("#board");
const winningMessageTextElement = document.querySelector(
  "[data-winning-mesate-text]"
);
const winningMessageEleement = document.querySelector(".winning-message");

const restartButton = document.querySelector("#restartButton");

restartButton.addEventListener('click', startGame)
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let circleTurn = false;

startGame();

function startGame() {
  cellElements.forEach(cell => {
      cell.classList.remove(X_Class)
      cell.classList.remove(Circle_Class)
      cell.removeEventListener('click', handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });
  setBoardHoverStatus();
  winningMessageEleement.classList.remove('show');
}

function handleClick(e) {
  const cell = e.target;
  const currentClassName = circleTurn ? Circle_Class : X_Class;
  //place mark
  placeMark(cell, currentClassName);
  //check win
  if (checkwin(currentClassName)) {
    endGame(false);
  }
  //check draw
  else if(isDraw()){
      endGame(true)
  }
  //switch turn
  switchturn();
  //Set board hover status
  setBoardHoverStatus();
}

function isDraw(){
    return [...cellElements].every(cell =>{
        return cell.classList.contains(X_Class) || cell.classList.contains(Circle_Class)
    })
}
function endGame(draw) {
    winningMessageTextElement.innerText = `Draw`;
  if (draw) {
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageEleement.classList.add('show')
}

const placeMark = (cell, currentClassName) => {
  cell.classList.add(currentClassName);
};

const switchturn = () => {
  circleTurn = !circleTurn;
};

function setBoardHoverStatus() {
  boardElement.classList.remove(X_Class);
  boardElement.classList.remove(Circle_Class);
  if (circleTurn) {
    boardElement.classList.add(Circle_Class);
  } else {
    boardElement.classList.add(X_Class);
  }
}

function checkwin(currentClassName) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cellElements[index].classList.contains(currentClassName);
    });
  });
}
