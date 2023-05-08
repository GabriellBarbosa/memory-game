class MemoryGame {
  constructor(cardsNodeList, modalHtmlElement) {
    this._cards = Array.from(cardsNodeList);
    this._modal = modalHtmlElement;
    this._firstCard;
    this._secondCard;
    this.userAttempts = 0;
  }

  init() {
    this.addEvents();
    this.bindEvents();
    this._shuffleCards();
    this._flipCardOnClick();
  }

  _shuffleCards() {
    this._cards.forEach((card) => {
      const randomNumber = Math.ceil(Math.random() * 15);
      card.style.order = String(randomNumber);
    });
  }

  _flipCardOnClick() {
    this._cards.forEach((card) => {
      card.addEventListener("click", this.flip);
    });
  }

  addEvents() {
    const restartButton = this._modal.querySelector("button");
    restartButton.addEventListener("click", this.restart);
  }

  bindEvents() {
    this.flip = this.flip.bind(this);
    this.restart = this.restart.bind(this);
  }

  reset = () => {
    this._firstCard = null;
    this._secondCard = null;
  };

  addClickEvent = (element) => {
    element.addEventListener("click", this.flip);
    return element;
  };

  removeClickEvent = (element) => {
    element.removeEventListener("click", this.flip);
    return element;
  };

  flip(card) {
    if (!this._firstCard || !this._secondCard) {
      card.currentTarget.classList.toggle("flip");
      this._checkCards(card.currentTarget);
    }
  }

  _checkCards(card) {
    this._setCardClicked(card);
    this._handleCardsMatch();
  };

  _setCardClicked(card) {
    if (!this._firstCard) {
      this._firstCard = card;
      this.removeClickEvent(this._firstCard);
    } else {
      this._secondCard = card;
      this.removeClickEvent(this._secondCard);
    }
  }

  _handleCardsMatch() {
    if (this._firstCard && this._secondCard) {
      this.userAttempts += 1;
      if (this._cardsAreEqual()) {
        this.match();
        this.gameOver();
      } else {
        this.noMatch();
      }
    }
  };

  _cardsAreEqual() {
    return this._firstCard.dataset.card === this._secondCard.dataset.card;
  }

  // mantém as cartas viradas se forem iguais
  match = () => {
    this.removeClickEvent(this._firstCard);
    this.removeClickEvent(this._secondCard);
    this.reset();
  };

  gameOver = () => {
    const flipped = this._cards.filter((card) => {
      return card.classList.contains("flip");
    });

    if (flipped.length === this._cards.length) {
      this.gameOverMessages();
      this._modal.classList.add("active");
    }
  };

  gameOverMessages = () => {
    const modalElements = {
      title: this._modal.querySelector("h2"),
      message: this._modal.querySelector("p"),
      record: this._modal.querySelector("span"),
    };

    const record = window.localStorage.getItem("record");
    if (!record || this.userAttempts < record) {
      window.localStorage.setItem("record", this.userAttempts);
      modalElements.title.innerText = "Parabéns, você bateu o seu recorde!!";
      modalElements.record.innerText = `Recorde: ${this.userAttempts}`;
    } else {
      modalElements.title.innerText = "Game Over, tente novamente!";
      modalElements.record.innerText = `Recorde: ${record}`;
    }

    modalElements.message.innerText = `${this.userAttempts} tentativas`;
  };

  // desvira as cartas se não forem iguais
  noMatch = () => {
    setTimeout(() => {
      this.addClickEvent(this._firstCard);
      this.addClickEvent(this._secondCard);
      this._firstCard.classList.remove("flip");
      this._secondCard.classList.remove("flip");
      this.reset();
    }, 1200);
  };

  restart = () => {
    this._cards.forEach((card) => {
      card.classList.remove("flip");
      this.shuffle(card);
      this.addClickEvent(card);
    });
    this._modal.classList.remove("active");
    this.userAttempts = 0;
  };

  shuffle = (card) => {
    const randomNumber = Math.ceil(Math.random() * 15);
    card.style.order = String(randomNumber);
  };
}

export { MemoryGame };
