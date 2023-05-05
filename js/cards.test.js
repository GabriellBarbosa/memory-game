/**
 * @jest-environment jsdom
 */

import { Cards } from "./cards";

jest.useFakeTimers();

let documentSpy;
beforeAll(() => {
    documentSpy = jest.spyOn(document, 'querySelectorAll');
});

/* 
====REMINDERS====
cards should be private (try to test with cardsNodeList)
*/

describe('Cards class', () => {
    let cards;
    let modal;
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
        documentSpy.mockReturnValue(mockElement);
        cards = mockElement.querySelectorAll('.memory_card');
        modal = mockElement.querySelector('.modal-bg')
        memoryGame = new Cards(cards, modal);
        const initMemoryGame = jest.fn(memoryGame.execute);
        initMemoryGame();
    });

    it('should have four cards', () => {
        expect(Array.from(cards).length).toBe(4);
    });

    it('should have a modal element', () => {
        expect(modal).toBeTruthy();
    });

    it('should add "flip" to the classList of the first two cards clicked', () => {
        const spiderCard = cards[0];
        const hulkCard = cards[3];

        spiderCard.click();
        hulkCard.click();

        expect(Array.from(spiderCard.classList)).toContain('flip');
        expect(Array.from(hulkCard.classList)).toContain('flip');
    });

    it('should not add "flip" to the classList of the third card clicked if the firt two not match', () => {
        const spiderCard = cards[0];
        const hulkCard1 = cards[3];
        const hulkCard2 = cards[2];

        spiderCard.click();
        hulkCard1.click();
        hulkCard2.click();

        expect(Array.from(hulkCard2.classList)).not.toContain('flip');
    });

    it('should flip cards back after 1.2sec if not match', () => {
        const spiderCard = cards[0];
        const hulkCard = cards[3];

        spiderCard.click(); 
        hulkCard.click();

        jest.advanceTimersByTime(1200);

        expect(Array.from(spiderCard.classList)).not.toContain('flip');
        expect(Array.from(hulkCard.classList)).not.toContain('flip');
    });

    it('should keep cards flipped after 1.2sec if match', () => {
        const spiderCard1 = cards[0];
        const spiderCard2 = cards[1];

        spiderCard1.click();
        spiderCard2.click();

        jest.advanceTimersByTime(1200);

        expect(Array.from(spiderCard1.classList)).toContain('flip');
        expect(Array.from(spiderCard2.classList)).toContain('flip');
    });

    it('should open gameOver modal when all cards are flipped', () => {
        const spiderCard1 = cards[0];
        const spiderCard2 = cards[1];
        const hulkCard1 = cards[2];
        const hulkCard2 = cards[3];

        spiderCard1.click();
        spiderCard2.click();
        hulkCard1.click();
        hulkCard2.click();

        expect(Array.from(modal.classList)).toContain('active');
    });

    it('should add 1 attempt for each two cards flipped', () => {
        const spiderCard = cards[0];
        const hulkCard = cards[2];

        spiderCard.click();
        hulkCard.click();

        jest.advanceTimersByTime(1200);
        spiderCard.click();
        hulkCard.click();

        jest.advanceTimersByTime(1200);
        spiderCard.click();
        hulkCard.click();

        expect(memoryGame.userAttempts).toBe(3);
    });
});