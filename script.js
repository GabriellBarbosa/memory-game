const cards = document.querySelectorAll('.memory_card');

let cardClicked = false;
let firstCard, secondCard;

const toggleFlip = ({ currentTarget }) => {
  const cardIsEmpty = !firstCard || !secondCard;
  if (cardIsEmpty) {
    currentTarget.classList.toggle('flip');
    checkCards(currentTarget);
  }
};

const checkCards = (card) => {
  if (!cardClicked) {
    firstCard = card;
    cardClicked = true;
    removeToggleEvent(firstCard);
  } else {
    secondCard = card;
    cardClicked = false;
    removeToggleEvent(secondCard);
    addToggleEvent(firstCard);
  }
  noName();
};

const noName = () => {
  if (secondCard && !cardClicked) {
    const datasetMatches = firstCard.dataset.card === secondCard.dataset.card;
    if (!datasetMatches) {
      cardsNoMatches();
    } else {
      cardsMatches();
    }
  }
};

const cardsNoMatches = () => {
  setTimeout(() => {
    addToggleEvent(secondCard);
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');
    resetCards();
  }, 1200);
};

const cardsMatches = () => {
  removeToggleEvent(firstCard);
  removeToggleEvent(secondCard);
  resetCards();
};

const resetCards = () => {
  firstCard = null;
  secondCard = null;
};

const addToggleEvent = (element) => {
  element.addEventListener('click', toggleFlip);
  return element;
};
const removeToggleEvent = (element) => {
  element.removeEventListener('click', toggleFlip);
  return element;
};

const shuffleCards = (card) => {
  const randomNumber = Math.ceil(Math.random() * 15);
  card.style.order = String(randomNumber);
  console.log(String(randomNumber));
};

cards.forEach((card) => {
  shuffleCards(card);
  card.s;
  card.addEventListener('click', toggleFlip);
});
