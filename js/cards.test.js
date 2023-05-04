/**
 * @jest-environment jsdom
 */

import { Cards } from "./cards";

let spy;
beforeAll(() => {
    spy = jest.spyOn(document, 'querySelectorAll');
});

describe('Cards class', () => {
    let memoryGame;
    beforeAll(() => {
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
    });

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
});