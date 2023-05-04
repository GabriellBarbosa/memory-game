/**
 * @jest-environment jsdom
 */

import { Cards } from "./cards";

jest.useFakeTimers();

let spy;
beforeAll(() => {
    spy = jest.spyOn(document, 'querySelectorAll');
});

describe('Cards class', () => {
    let memoryGame;
    beforeEach(() => {
        const mockElement = document.createElement('section');
        mockElement.innerHTML = 
        `
        <div class="modal-bg">
            <div class="modal">
            <h2>Título</h2>
            <p>Mensagem</p>
            <span>Recorde</span>
            <button>Jogar novamente</button>
            </div>
        </div>

        <div class="memory_card" data-card="spider"></div>
        <div class="memory_card" data-card="spider"></div>
    
        <div class="memory_card" data-card="hulk"></div>
        <div class="memory_card" data-card="hulk"></div>
        `;
        spy.mockReturnValue(mockElement);
        const cardsNodeList = mockElement.querySelectorAll('.memory_card');
        const modalElement = mockElement.querySelector('.modal-bg')
        memoryGame = new Cards(cardsNodeList, modalElement);
        const initMemoryGame = jest.fn(memoryGame.execute);
        initMemoryGame();
    })

    it('should have four cards in this test', () => {
        expect(Array.from(memoryGame.cards).length).toBe(4);
    });

    it('should have a modal element', () => {
        expect(memoryGame.modal).toBeTruthy();
    });

    it('adds "flip" to the classList of the first two cards clicked', () => {
        const firstCard = memoryGame.cards[0];
        const secondCard = memoryGame.cards[3];

        firstCard.click();
        secondCard.click();

        expect(Array.from(firstCard.classList)).toContain('flip');
        expect(Array.from(secondCard.classList)).toContain('flip');
    });

    it('should not add "flip" to the classList of the third card clicked', () => {
        const firstCard = memoryGame.cards[0];
        const secondCard = memoryGame.cards[3];
        const thirdCard = memoryGame.cards[2];

        firstCard.click();
        secondCard.click();
        thirdCard.click();

        expect(Array.from(thirdCard.classList)).not.toContain('flip');
    });

    it('should flip cards back after 1.2sec if not match', () => {
        const spiderCard = memoryGame.cards[0];
        const hulkCard = memoryGame.cards[3];

        spiderCard.click(); 
        hulkCard.click();

        jest.advanceTimersByTime(1200);

        expect(Array.from(spiderCard.classList)).not.toContain('flip');
        expect(Array.from(hulkCard.classList)).not.toContain('flip');
    });

    it('should keep cards flipped after 1.2sec if match', () => {
        const spiderCard1 = memoryGame.cards[0];
        const spiderCard2 = memoryGame.cards[1];

        spiderCard1.click();
        spiderCard2.click();

        jest.advanceTimersByTime(1200);

        expect(Array.from(spiderCard1.classList)).toContain('flip');
        expect(Array.from(spiderCard2.classList)).toContain('flip');
    });
});