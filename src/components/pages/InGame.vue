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
                <stats-board />
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
        <div class="modal-overlay" v-if="gameStore.gameState.gamePaused && !gameStore.gameState.gameOver">
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

        <!-- Game Over Modal -->
        <div class="modal-overlay" v-if="gameStore.gameState.gameOver">
            <div class="modal-content">
                <h2>Game Over!</h2>
                <div style="font-size: 2rem; margin: 1rem 0; font-weight: bold;">
                    <div v-if="gameStore.score.player1 > gameStore.score.player2" style="color: green;">Player 1 Wins!</div>
                    <div v-else-if="gameStore.score.player2 > gameStore.score.player1" style="color: green;">Player 2 Wins!</div>
                    <div v-else style="color: red;">It's a Tie!</div>
                </div>
                <button class="modal-btn" @click="restartGame">Play Again</button>
                <button class="modal-btn" @click="exitGame">Exit Game</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import ScoreBoard from '../ScoreBoard.vue';
import DeckArea from '../DeckArea.vue';
import StatsBoard from '../StatsBoard.vue';

import { useGameStore } from '@/assets/stores/game';
import { useDeckStore } from '@/assets/stores/deck';
import { useSound } from '@/composables/useSound';

import { ref, onMounted, onUnmounted, computed, watch, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

const gameStore = useGameStore();
const deckStore = useDeckStore();
const sound = useSound();
const router = useRouter();
const { proxy } = getCurrentInstance();

watch(() => gameStore.gameState.gameOver, (isOver) => {
    if (isOver) {
        if (gameStore.score.player1 === gameStore.score.player2) {
            sound.playTie();
        } else {
            sound.playWin();
            if (proxy && proxy.$confetti) {
                proxy.$confetti.start();
            }
        }
    } else {
        if (proxy && proxy.$confetti) {
            proxy.$confetti.stop();
        }
    }
});

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
    deckStore.createDeck();
});

onUnmounted(() => {
    window.removeEventListener('keyup', handleKeyup);
});
</script>