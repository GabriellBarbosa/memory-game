import { Cards } from './js/cards.js';
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

const cards = new Cards('.memory_card', '.modal-bg');
cards.execute();