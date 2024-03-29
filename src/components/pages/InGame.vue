<template>
    <div>
        <div id="game-board" :class="{ blur: !gameStore.gameState.gameStarted }" >
            <div id="left-column">
                <score-board />
            </div>
            <!-- <div class="break-v"></div> -->
            <div id="center-column">
                <deck-area 
                    v-bind="gameStore.gameState"
                    @set-continue-game-loop="setContinueGameLoop" 
                    @set-last-card-flipped="setLastCardFlipped" 
                />
            </div>
            <div id="right-column">
                <!-- <score-board v-bind="score" /> -->
            </div>
        </div>
        <div id="start-game-text" v-if="!gameStore.gameState.gameStarted">
            Press Space to Start
        </div>
    </div>
    <!-- <input type="button" @click="inc"/> -->
</template>

<script setup>
import ScoreBoard from '../ScoreBoard.vue';
import DeckArea from '../DeckArea.vue';

import { useGameStore } from '@/assets/stores/game';

import { ref, onMounted, computed, watch } from 'vue';
const gameStore = useGameStore()

// Setters 
const setContinueGameLoop = (value) => {
    gameStore.gameState.continueGameLoop = value;
    console.log('continueGameLoop: ', gameStore.gameState.continueGameLoop);
}

const setLastCardFlipped = (value) => {
    gameStore.lastCardFlipped = value;
    console.log('lastCardFlipped: ', gameStore.lastCardFlipped);
}

onMounted(() => {
    window.addEventListener('keyup', (event) => {
        if (event.code === 'Space') {
            // alert('How to Play... Will be added later');
            if (gameStore.gameState.gameStarted === false) {
                gameStore.gameState.gameStarted = true;
                gameStore.gameState.continueGameLoop = true;
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