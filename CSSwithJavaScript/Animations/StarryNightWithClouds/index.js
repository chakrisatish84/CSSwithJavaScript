var container = document.querySelector(".container");

const starsFunction = () => {
  let starsCount = 500;
  let i = 0;
  while (i < starsCount) {
    let star = document.createElement("i");

    let x = Math.floor(Math.random() * window.innerWidth);
    let y = Math.floor(Math.random() * window.innerHeight);

    let duraation = Math.random() * 10;
    let size = Math.random() * 2;

    star.style.left = x + "px";
    star.style.top = y + "px";
    star.style.width = 1 + size + "px";
    star.style.height = 1 + size + "px";
    
    star.style.animationDuration = 5 + duraation + "s";
    star.style.animationDelay = duraation + "s";

    container.appendChild(star);

    i++;
  }
};

starsFunction();
