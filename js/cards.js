class Cards {
  constructor(cardsClass) {
    this.cards = document.querySelectorAll(cardsClass);
    this.cardIsClicked = false;
    this.firstCard;
    this.secondCard;
  }

  reset = () => {
    this.firstCard = null;
    this.secondCard = null;
  };

  addClickEvent = (element) => {
    element.addEventListener('click', this.flip);
    return element;
  };

  removeClickEvent = (element) => {
    element.removeEventListener('click', this.flip);
    return element;
  };

  // desvira as cartas se não forem iguais
  noMatch = () => {
    setTimeout(() => {
      this.addClickEvent(this.secondCard);
      this.firstCard.classList.remove('flip');
      this.secondCard.classList.remove('flip');
      this.reset();
    }, 1200);
  };

  // mantém as cartas viradas se forem iguais
  match = () => {
    this.removeClickEvent(this.firstCard);
    this.removeClickEvent(this.secondCard);
    this.reset();
  };

  // verifica se o dataset são iguais
  handleCardsMatch = () => {
    if (this.secondCard && !this.cardClicked) {
      const datasetMatch = this.firstCard.dataset.card === this.secondCard.dataset.card;
      if (datasetMatch) {
        this.match();
      } else {
        this.noMatch();
      }
    }
  };

  // atribui o valor para as variáveis firstCard e secondCard
  checkCards = (card) => {
    if (!this.cardClicked) {
      this.firstCard = card;
      this.cardClicked = true;
      this.removeClickEvent(this.firstCard);
    } else {
      this.secondCard = card;
      this.cardClicked = false;
      this.removeClickEvent(this.secondCard);
      this.addClickEvent(this.firstCard);
    }
    this.handleCardsMatch();
  };

  flip = ({ currentTarget }) => {
    const cardIsEmpty = !this.firstCard || !this.secondCard;
    if (cardIsEmpty) {
      currentTarget.classList.toggle('flip');
      this.checkCards(currentTarget);
    }
  }

  shuffle = (card) => {
    const randomNumber = Math.ceil(Math.random() * 15);
    card.style.order = String(randomNumber);
  };

  bindEvents = () => {
    this.flip = this.flip.bind(this);
  }

  execute = () => {
    this.bindEvents();
    [...this.cards].forEach((card) => {
      this.shuffle(card);
      card.addEventListener('click', this.flip);
    });
  }
}

export { Cards };