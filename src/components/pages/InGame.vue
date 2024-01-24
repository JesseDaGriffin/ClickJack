<template>
    <div id="game-board" >
        <div id="left-column">
            <score-board v-bind="score" />
        </div>
        <!-- <div class="break-v"></div> -->
        <div id="center-column">
            <deck-area 
                v-bind="gameState"
                @set-game-started="setGameStarted" 
                @set-continue-game-loop="setContinueGameLoop" 
                @set-last-card-flipped="setLastCardFlipped" 
            />
        </div>
        <div id="right-column">
            <!-- <score-board v-bind="score" /> -->
        </div>
    </div>
    <!-- <input type="button" @click="inc"/> -->
</template>

<script>
import ScoreBoard from '../ScoreBoard.vue';
import DeckArea from '../DeckArea.vue';

import { ref, onMounted, computed, watch } from 'vue';

export default {
    components: {
        ScoreBoard,
        DeckArea,
    },
    setup() {
        const playerOneKey = 'ControlLeft';
        const playerTwoKey = 'ControlRight';

        const gameState = ref({
            gameStarted: false,
            continueGameLoop: false
        });

        const score = ref({
            player1: 0,
            player2: 0
        });

        const lastCardFlipped = ref('');

        const lastPlayerClicked = ref('');

        // Setters 
        const setContinueGameLoop = (value) => {
            gameState.value.continueGameLoop = value;
            console.log('continueGameLoop: ', gameState.value.continueGameLoop);
        }

        const setGameStarted = (value) => {
            gameState.value.gameStarted = value;
            console.log('gameStarted: ', gameState.value.gameStarted);
        }

        const setLastCardFlipped = (value) => {
            lastCardFlipped.value = value;
            console.log('lastCardFlipped: ', lastCardFlipped.value);
        }

        const handlePlayerInput = (value) => {
            let playerScored = "";
            if(lastCardFlipped.value.includes('jack')) {
                if(lastPlayerClicked.value === 'player1') {
                    playerScored = "Player 1";
                    score.value.player1 = score.value.player1 + 1;
                } else if(lastPlayerClicked.value === 'player2') {
                    playerScored = "Player 2";
                    score.value.player2 = score.value.player2 + 1;
                }
                lastPlayerClicked.value = '';
                lastCardFlipped.value = '';

                alert(playerScored + " scored a point!")
                setContinueGameLoop(true);
            } else {
                lastPlayerClicked.value = '';
            }
        }

        onMounted(() => {
            window.addEventListener('keyup', (event) => {
                if (event.code === 'Space') {
                    alert('How to Play... Will be added later');
                } else if (event.code === playerOneKey) {
                    lastPlayerClicked.value === '' ? lastPlayerClicked.value = 'player1' : '';
                } else if (event.code === playerTwoKey) {
                    lastPlayerClicked.value === '' ? lastPlayerClicked.value = 'player2' : '';
                }

                if(lastPlayerClicked.value !== '' && lastCardFlipped.value !== '') {
                    handlePlayerInput();
                }
            })
        });
        
        return {
            score,
            gameState,
            lastPlayerClicked,
            setLastCardFlipped,
            setContinueGameLoop,
            setGameStarted,
        };
    },
}

</script>