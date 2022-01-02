const cards = document.querySelectorAll(".card");

console.log(cards);

var observer = new IntersectionObserver(
  (entries) => {
    console.log(entries);
    entries.forEach((entry) => {
      entry.target.classList.toggle("shown", entry.isIntersecting);
    });
  },
  {
    threshold: 1,
  }
);

var lastCardObserver = new IntersectionObserver((entries) => {
  const lastCaard = entries[0];
  if (!lastCaard.isIntersecting) return;
  loadNewCards();
  lastCardObserver.unobserve(lastCaard.target);
  lastCardObserver.observe(document.querySelector(".card:last-child"));
}, {});

lastCardObserver.observe(document.querySelector(".card:last-child"));

cards.forEach((card) => {
  observer.observe(card);
});

const cardContainer = document.querySelector(".card-container");
function loadNewCards() {
  for (let i = 0; i <= 10; i++) {
    const card = document.createElement("div");
    card.textContent = "New card";
    card.classList.add('card');
    observer.observe(card);
    cardContainer.append(card);
  }
};
