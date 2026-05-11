import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { useDeckStore } from '@/assets/stores/deck';
import { useSound } from '@/composables/useSound';

export const useGameStore = defineStore('game', () => {
    // State
    const deckStore = useDeckStore();
    const sound = useSound();
    
    const score = ref({
        player1: 0,
        player2: 0
    });

    const gameState = ref({
        gameStarted: false,
        continueGameLoop: false,
        gameOver: false,
        gamePaused: false,
        pauseForAnimation: false
    });

    const scoreStatus = ref({
        status: '',
        player: ''
    });

    const playerActionButtons = ref({
        playerOneKey: 'ControlLeft',
        playerTwoKey: 'ControlRight'
    });
    
    const lastCardFlipped = ref('');

    const lastPlayerClicked = ref('');

    let animationTimeout1 = null;
    let animationTimeout2 = null;

    // Actions
    function handlePlayerInput () {
        if (gameState.value.pauseForAnimation) return;

        const isJack = lastCardFlipped.value.includes('jack');
        const player = lastPlayerClicked.value === 'player1' ? 'player1' : 'player2';
        const scoreChange = isJack ? 1 : -1;
        
        if (isJack) {
            lastCardFlipped.value = 'claimed';
            sound.playSuccess();
        } else {
            sound.playFart();
        }
        
        gameState.value.continueGameLoop = false;
        gameState.value.pauseForAnimation = true;
        
        score.value[player] += scoreChange;
        
        scoreStatus.value = {
            status: isJack ? 'scored' : 'lost',
            player: player
        };

        // Clear immediately to prevent stacking inputs from the same keydown
        lastPlayerClicked.value = '';

        if (animationTimeout1) clearTimeout(animationTimeout1);
        if (animationTimeout2) clearTimeout(animationTimeout2);

        animationTimeout1 = setTimeout(() => {
            scoreStatus.value = { status: '', player: '' };
        }, 1000);

        animationTimeout2 = setTimeout(() => {
            gameState.value.pauseForAnimation = false;

            if(deckStore.gameDeck.length === 0) {
                gameState.value.gameOver = true;
            } else if (!gameState.value.gamePaused) {
                gameState.value.continueGameLoop = true;
            }
            
            lastCardFlipped.value = '';
        }, 2000);
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
        scoreStatus,
        playerActionButtons,  
        lastCardFlipped,
        lastPlayerClicked,
        handlePlayerInput,
        resetGame
    }
})
