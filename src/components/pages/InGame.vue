<template>
    <div id="game-board">
        <div id="left-column">
            <score-board v-bind="score" />
        </div>
        <!-- <div class="break-v"></div> -->
        <div id="center-column">
            <deck-area />
        </div>
        <div id="right-column">
            <!-- <score-board v-bind="score" /> -->
        </div>
    </div>
    <!-- <input type="button" @click="inc"/> -->
</template>

<script setup>
import ScoreBoard from '../ScoreBoard.vue';
import DeckArea from '../DeckArea.vue';

import { ref, onMounted, computed, watch } from 'vue';

const score = ref({
    player1: 1,
    player2: 0
});

// function inc() {
//     score.value.player1 = score.value.player1 + 1;
//     console.log('inc');
//     console.log(score);
// }
</script>
