document.addEventListener("DOMContentLoaded", () => {
    const gameBoard = document.getElementById('game-board');
    const movesCountElement = document.getElementById('moves-count');
    const restartButton = document.getElementById('restart-button');
    const endGameElement = document.getElementById('end-game');
    const endMessageElement = document.getElementById('end-message');
    const restartButtonEnd = document.getElementById('restart-button-end');
    const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'];
    let firstCard = null;
    let secondCard = null;
    let lockBoard = false;
    let moves = 0;
    let matches = 0;

    // Embaralhar cartas
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    // Criar cartas
    function createBoard() {
        gameBoard.innerHTML = '';
        shuffle(cards);
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.dataset.value = card;
            cardElement.addEventListener('click', flipCard);
            gameBoard.appendChild(cardElement);
        });
    }

    // Virar carta
    function flipCard() {
        if (lockBoard || this === firstCard) return;

        this.classList.add('flip');
        this.textContent = this.dataset.value;

        if (!firstCard) {
            firstCard = this;
        } else {
            secondCard = this;
            lockBoard = true;
            moves++;
            movesCountElement.textContent = `Movimentos: ${moves}`;
            checkForMatch();
        }
    }

    // Confirmar se as cartas são iguais
    function checkForMatch() {
        if (firstCard.dataset.value === secondCard.dataset.value) {
            disableCards();
        } else {
            unflipCards();
        }
    }

    // Desabilitar cartas iguais
    function disableCards() {
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        matches++;
        if (matches === cards.length / 2) {
            endGame();
        }
        resetBoard();
    }

    // Desvirar cartas diferentes
    function unflipCards() {
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }

    // Reiniciar o tabuleiro
    function resetBoard() {
        [firstCard, secondCard, lockBoard] = [null, null, false];
    }

    // Terminar o jogo
    function endGame() {
        gameBoard.classList.add('hidden');
        if (moves <= 8) {
            endMessageElement.textContent = 'Parabéns! Você terminou o jogo em 8 movimentos ou menos!';
        } else {
            endMessageElement.textContent = 'Parabéns! Você terminou o jogo!';
        }
        endGameElement.classList.remove('hidden');
    }

    // Reiniciar o Jogo
    function restartGame() {
        moves = 0;
        matches = 0;
        movesCountElement.textContent = `Movimentos: ${moves}`;
        gameBoard.classList.remove('hidden');
        endGameElement.classList.add('hidden');
        createBoard();
    }

    // Começar o jogo
    createBoard();

    // Botões de reiniciar
    restartButton.addEventListener('click', restartGame);
    restartButtonEnd.addEventListener('click', restartGame);
});
