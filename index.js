import { MemoryGame } from './js/MemoryGame.js';
import { debounce } from './js/debounce.js';

// Tela de aviso: virar o celular
  const turnPhoneElement = document.querySelector('.turn-phone-container');
  if(window.innerWidth < 440) { 
    turnPhoneElement.classList.add('active');
  }
  const handleScreenWidth = () => {
    if(window.innerWidth > 440) {
      turnPhoneElement.classList.remove('active');
    } else {
      turnPhoneElement.classList.add('active');
    }
  }
  window.addEventListener('resize', debounce(handleScreenWidth, 200));

const cardsNodeList = document.querySelectorAll('.memory_card');
const modalElement = document.querySelector('.modal-bg')
const cards = new MemoryGame(cardsNodeList, modalElement);
cards.init();