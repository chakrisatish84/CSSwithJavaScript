const textElement = document.querySelector(".name");

const text = textElement.textContent;

textElement.textContent = "";

text.split("").forEach(character => {
  const spanElement = document.createElement("span");
  spanElement.innerText = character;

  textElement.appendChild(spanElement);
});


const onTick = () => {
    const spanElement = textElement.querySelectorAll('span')[char];
    spanElement.classList.add('fade');
    char++;

    if(char === document.querySelectorAll('span').length)
    {
        complete();
        return;
    }
};

let char = 0;
let timer = setInterval(onTick, 50);



const complete =() =>{
    clearInterval(timer);
    timer = null;
}
