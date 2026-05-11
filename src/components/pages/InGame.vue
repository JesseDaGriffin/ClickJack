<template>
    <div>
        <div id="game-board" :class="{ 
            blur: !gameStore.gameState.gameStarted || gameStore.gameState.gamePaused
        }" >
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
            <div class="hints-text">
                <div>Controls</div>
                <div>Player 1: {{ gameStore.playerActionButtons.playerOneKey.replace('Control', 'Ctrl ') }}</div>
                <div>Player 2: {{ gameStore.playerActionButtons.playerTwoKey.replace('Control', 'Ctrl ') }}</div>
                <div style="margin-top: 1rem;">Press Esc to open menu mid-game</div>
            </div>
        </div>

        <div class="in-game-hints" v-if="gameStore.gameState.gameStarted && !gameStore.gameState.gamePaused">
            Press Esc for Menu | P1: {{ gameStore.playerActionButtons.playerOneKey.replace('Control', 'Ctrl ') }} | P2: {{ gameStore.playerActionButtons.playerTwoKey.replace('Control', 'Ctrl ') }}
        </div>

        <!-- Menu Modal -->
        <div class="modal-overlay" v-if="gameStore.gameState.gamePaused">
            <div class="modal-content">
                <h2>Game Paused</h2>
                <button class="modal-btn" @click="resumeGame">Resume</button>
                <button class="modal-btn" @click="restartGame">Restart Game</button>
                <button class="modal-btn" @click="exitGame">Exit Game</button>
                <div class="hints-text" style="font-size: 1.2rem; margin-top: 1rem;">
                    <div>P1: {{ gameStore.playerActionButtons.playerOneKey.replace('Control', 'Ctrl ') }}</div>
                    <div>P2: {{ gameStore.playerActionButtons.playerTwoKey.replace('Control', 'Ctrl ') }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ScoreBoard from '../ScoreBoard.vue';
import DeckArea from '../DeckArea.vue';

import { useGameStore } from '@/assets/stores/game';

import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import { useRouter } from 'vue-router';

const gameStore = useGameStore()
const router = useRouter();

const resumeGame = () => {
    gameStore.gameState.gamePaused = false;
};

const restartGame = () => {
    gameStore.resetGame();
};

const exitGame = () => {
    gameStore.resetGame();
    router.push('/');
};

const handleKeyup = (event) => {
    if (event.code === 'Space') {
        if (gameStore.gameState.gameStarted === false) {
            gameStore.gameState.gameStarted = true;
        }
    } else if (event.code === 'Escape') {
        if (gameStore.gameState.gameStarted) {
            gameStore.gameState.gamePaused = !gameStore.gameState.gamePaused;
        }
    } else if (!gameStore.gameState.gamePaused && gameStore.lastCardFlipped !== '') {
        if (event.code === gameStore.playerActionButtons.playerOneKey) {
            gameStore.lastPlayerClicked = 'player1';
            gameStore.handlePlayerInput();
        } else if (event.code === gameStore.playerActionButtons.playerTwoKey) {
            gameStore.lastPlayerClicked = 'player2';
            gameStore.handlePlayerInput();
        }
    }
};

onMounted(() => {
    window.addEventListener('keyup', handleKeyup);
});

onUnmounted(() => {
    window.removeEventListener('keyup', handleKeyup);
});
</script>