<template>
    <div>
        <div id="game-board" :class="{ blur: !gameStore.gameState.gameStarted }" >
            <div id="left-column">
                <score-board />
            </div>
            <div id="center-column">
                <deck-area />
            </div>
            <div id="right-column">
            </div>
        </div>
        <div id="start-game-text" v-if="!gameStore.gameState.gameStarted">
            Press Space to Start
        </div>
    </div>
</template>

<script setup>
import ScoreBoard from '../ScoreBoard.vue';
import DeckArea from '../DeckArea.vue';

import { useGameStore } from '@/assets/stores/game';

import { ref, onMounted, computed, watch } from 'vue';
const gameStore = useGameStore()

onMounted(() => {
    window.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            // alert('How to Play... Will be added later');
            if (gameStore.gameState.gameStarted === false) {
                gameStore.gameState.gameStarted = true;
                // gameStore.gameState.continueGameLoop = true;
            }
        } else if (event.code === gameStore.playerActionButtons.playerOneKey) {
            gameStore.lastPlayerClicked === '' ? gameStore.lastPlayerClicked = 'player1' : '';
        } else if (event.code === gameStore.playerActionButtons.playerTwoKey) {
            gameStore.lastPlayerClicked === '' ? gameStore.lastPlayerClicked = 'player2' : '';
        }

        if(gameStore.lastPlayerClicked !== '' && gameStore.lastCardFlipped !== '') {
            gameStore.handlePlayerInput();
        }
    })
});
</script>