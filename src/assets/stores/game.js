import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useGameStore = defineStore('game', () => {
    // State
    const score = ref({
        player1: 0,
        player2: 0
    });

    const gameState = ref({
        gameStarted: false,
        continueGameLoop: false
    });

    const playerActionButtons = ref({
        playerOneKey: 'ControlLeft',
        playerTwoKey: 'ControlRight'
    });
    
    const lastCardFlipped = ref('');

    const lastPlayerClicked = ref('');

    // Actions
    function handlePlayerInput() {
        let playerScored = "";
        if(this.lastCardFlipped.includes('jack')) {
            if(this.lastPlayerClicked === 'player1') {
                playerScored = "Player 1";
                this.score.player1 = this.score.player1 + 1;
            } else if(this.lastPlayerClicked === 'player2') {
                playerScored = "Player 2";
                this.score.player2 = this.score.player2 + 1;
            }
            this.lastPlayerClicked = '';
            this.lastCardFlipped = '';

            alert(playerScored + " scored a point!")
            this.gameState.continueGameLoop = true;
        } else {
            this.lastPlayerClicked = '';
        }
    }

    // Getters / Computed Properties


    return { 
        score, 
        gameState, 
        playerActionButtons,  
        lastCardFlipped,
        lastPlayerClicked,
        handlePlayerInput
    }
})
