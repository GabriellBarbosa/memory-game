class MemoryGame {
  // cardsNodeList
  constructor(cardsNodeList, aHtmlElement) {
    this._cards = Array.from(cardsNodeList);
    this.modal = aHtmlElement;
    this.cardIsClicked = false;
    this.firstCard;
    this.secondCard;
    this.userAttempts = 0;
  }

  init() {
    this.addEvents();
    this.bindEvents();
    this._cards.forEach((card) => {
      this.shuffle(card);
      card.addEventListener('click', this.flip);
    });
  }

  addEvents() {
    const restartButton = this.modal.querySelector('button');
    restartButton.addEventListener('click', this.restart);
  }

  bindEvents() {
    this.flip = this.flip.bind(this);
    this.restart = this.restart.bind(this);
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

  gameOverMessages = () => {
    const modalElements = {
      title: this.modal.querySelector('h2'),
      message: this.modal.querySelector('p'),
      record: this.modal.querySelector('span')
    }

    const record = window.localStorage.getItem('record');
    if(!record || this.userAttempts < record) {
      window.localStorage.setItem('record', this.userAttempts);
      modalElements.title.innerText = 'Parabéns, você bateu o seu recorde!!';
      modalElements.record.innerText = `Recorde: ${this.userAttempts}`;
    } else {
      modalElements.title.innerText = 'Game Over, tente novamente!';
      modalElements.record.innerText = `Recorde: ${record}`;
    }

    modalElements.message.innerText = `${this.userAttempts} tentativas`;
  }

  gameOver = () => {
    const flipped = this._cards.filter((card) => {
      return card.classList.contains('flip');
    });

    if(flipped.length === this._cards.length) {
      this.gameOverMessages();
      this.modal.classList.add('active');
    }
  }

  // verifica se o dataset são iguais
  handleCardsMatch = () => {
    if (this.secondCard && !this.cardClicked) {
      this.userAttempts += 1;
      const datasetMatch = this.firstCard.dataset.card === this.secondCard.dataset.card;
      if (datasetMatch) {
        this.match();
        this.gameOver();
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

  restart = () => {
    this._cards.forEach((card) => {
      card.classList.remove('flip');
      this.shuffle(card);
      this.addClickEvent(card);
    });
    this.modal.classList.remove('active');
    this.userAttempts = 0;
  }
}

export { MemoryGame };