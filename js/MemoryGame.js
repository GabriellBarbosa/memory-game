class MemoryGame {
  constructor(cardsNodeList, modalHtmlElement) {
    this._cards = Array.from(cardsNodeList);
    this._modal = modalHtmlElement;
    this._firstCard;
    this._secondCard;
    this.userAttempts = 0;
  }

  restart() {
    this._unflipCards();
    this._modal.classList.remove("active");
    this.userAttempts = 0;
    this.init();
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
      card.addEventListener("click", this._flip);
    });
  }

  addEvents() {
    const restartButton = this._modal.querySelector("button");
    restartButton.addEventListener("click", this.restart);
  }

  bindEvents() {
    this._flip = this._flip.bind(this);
    this.restart = this.restart.bind(this);
  }

  _flip(card) {
    if (!this._firstCard || !this._secondCard) {
      card.currentTarget.classList.add("flip");
      const cardsClicked = this._setCardClicked(card.currentTarget);
      this._checkCards(cardsClicked.first, cardsClicked.second);
    }
  }

  _setCardClicked(card) {
    if (!this._firstCard) {
      this._firstCard = card;
      this._removeClickEvent(this._firstCard);
    } else {
      this._secondCard = card;
      this._removeClickEvent(this._secondCard);
    }
    return { first: this._firstCard, second: this._secondCard };
  }

  _checkCards(firstCard, secondCard) {
    if (firstCard && secondCard) {
      this.userAttempts += 1;
      this._handleCardsMatch();
    }
  }

  _handleCardsMatch() {
    if (this._firstCard.dataset.card === this._secondCard.dataset.card) {
      this._match();
    } else {
      this._noMatch();
    }
  }

  _noMatch() {
    setTimeout(() => {
      this._addClickEvent(this._firstCard);
      this._addClickEvent(this._secondCard);
      this._firstCard.classList.remove("flip");
      this._secondCard.classList.remove("flip");
      this._resetClickedCards();
    }, 1200);
  }

  _match() {
    this._removeClickEvent(this._firstCard);
    this._removeClickEvent(this._secondCard);
    this._resetClickedCards();
    if (this._allCardsAreFlipped()) {
      this._gameOver();
    }
  }

  _resetClickedCards() {
    this._firstCard = null;
    this._secondCard = null;
  };

  _allCardsAreFlipped() {
    const flippedCards = this._cards.filter((card) => {
      return card.classList.contains("flip");
    });
    return flippedCards.length === this._cards.length;
  }

  _gameOver() {
    this._setGameOverMessages();
    this._modal.classList.add("active");
  }

  _setGameOverMessages() {
    if (this._recordBeaten()) {
      this._setMessages(
        "Parabéns, você bateu o seu recorde!!",
        `Recorde: ${this.userAttempts}`
      );
      window.localStorage.setItem("record", this.userAttempts);
    } else {
      this._setMessages("Game Over, tente novamente!", `Recorde: ${record}`);
    }
  }

  _recordBeaten() {
    const record = window.localStorage.getItem("record");
    return !record || this.userAttempts < record;
  }

  _setMessages(title, record) {
    const modalElements = this._gameOverModalElements();
    modalElements.title.innerText = title;
    modalElements.record.innerText = record;
    modalElements.message.innerText = `${this.userAttempts} tentativas`;
  }

  _gameOverModalElements() {
    return {
      title: this._modal.querySelector("h2"),
      message: this._modal.querySelector("p"),
      record: this._modal.querySelector("span"),
    };
  }

  _addClickEvent(card) {
    card.addEventListener("click", this._flip);
  }

  _removeClickEvent(card) {
    card.removeEventListener("click", this._flip);
  }

  _unflipCards() {
    this._cards.forEach((card) => {
      card.classList.remove("flip");
    });
  }
}

export { MemoryGame };
