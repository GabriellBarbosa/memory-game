import { MemoryGame } from './js/MemoryGame.js';
import { debounce } from './js/debounce.js';

const turnPhoneElement = document.querySelector('.turn-phone-container');

if (window.innerWidth < 440) { 
  turnPhoneElement.classList.add('active');
}

window.addEventListener('resize', debounce(turnPhoneOnSmallScreen, 200));

function turnPhoneOnSmallScreen() {
  if (window.innerWidth > 440) {
    turnPhoneElement.classList.remove('active');
  } else {
    turnPhoneElement.classList.add('active');
  }
}


const cardsNodeList = document.querySelectorAll('.memory_card');
const modalElement = document.querySelector('.modal-bg')
const memoryGame = new MemoryGame(cardsNodeList, modalElement);
memoryGame.init();