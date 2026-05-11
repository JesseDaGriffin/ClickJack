import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useDeckStore } from '@/assets/stores/deck';

export const useGameStore = defineStore('game', () => {
    // State
    const deckStore = useDeckStore();
    
    const score = ref({
        player1: 0,
        player2: 0
    });

    const gameState = ref({
        gameStarted: false,
        continueGameLoop: false,
        gameOver: false,
        gamePaused: false
    });

    const playerActionButtons = ref({
        playerOneKey: 'ControlLeft',
        playerTwoKey: 'ControlRight'
    });
    
    const lastCardFlipped = ref('');

    const lastPlayerClicked = ref('');

    // Actions
    function handlePlayerInput () {
        const isJack = lastCardFlipped.value.includes('jack');
        const player = lastPlayerClicked.value === 'player1' ? 'player1' : 'player2';
        const scoreChange = isJack ? 1 : -1;
        
        gameState.value.continueGameLoop = false;
        
        score.value[player] += scoreChange;
        
        if(deckStore.gameDeck.length === 0) {
            gameState.value.gameOver = true;
        } else if(isJack) {
            gameState.value.continueGameLoop = true;
        }
        
        alert(`${player === 'player1' ? 'Player 1' : 'Player 2'} ${isJack ? 'scored' : 'lost'} a point!`);

        lastPlayerClicked.value = '';
        lastCardFlipped.value = '';
    }

    // Getters / Computed Properties


    function resetGame() {
        score.value = { player1: 0, player2: 0 };
        gameState.value = {
            gameStarted: false,
            continueGameLoop: false,
            gameOver: false,
            gamePaused: false
        };
        lastCardFlipped.value = '';
        lastPlayerClicked.value = '';

        const deckArea = document.getElementById('deck-area');
        if (deckArea) {
            const flippedCards = deckArea.querySelectorAll('.flipped-card');
            flippedCards.forEach(card => card.remove());
            
            if (!document.getElementById('remaining-cards')) {
                const img = document.createElement('img');
                img.id = 'remaining-cards';
                img.className = 'deck';
                img.src = '../src/assets/cardBack.png';
                const deckPos = document.getElementById('deck-position');
                if(deckPos) {
                    deckPos.appendChild(img);
                }
            }
        }
    }

    return { 
        score, 
        gameState, 
        playerActionButtons,  
        lastCardFlipped,
        lastPlayerClicked,
        handlePlayerInput,
        resetGame
    }
})
