<template>
    <div id="game-board" >
        <div id="left-column">
            <score-board v-bind="score" />
        </div>
        <!-- <div class="break-v"></div> -->
        <div id="center-column">
            <deck-area @set-last-card-flipped="setLastCardFlipped" />
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

        const score = ref({
            player1: 0,
            player2: 0
        });

        const lastCardFlipped = ref('');

        const lastPlayerClicked = ref('');

        const setLastCardFlipped = (value) => {
            console.log('setting last card flipped', value);
            lastCardFlipped.value = value;
        }

        const handlePlayerInput = (value) => {
            if(lastCardFlipped.value.includes('jack')) {
                if(lastPlayerClicked.value === 'player1') {
                    score.value.player1 = score.value.player1 + 1;
                } else if(lastPlayerClicked.value === 'player2') {
                    score.value.player2 = score.value.player2 + 1;
                }
                lastPlayerClicked.value = '';
                lastCardFlipped.value = '';
            } else {
                lastPlayerClicked.value = '';
                // alert('That was not a Jack!');
            }
        }

        onMounted(() => {
            window.addEventListener('keyup', (event) => {
                // console.log(
                //     event.code,
                //     lastCardFlipped.value,
                //     lastPlayerClicked.value,
                // );

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
            lastPlayerClicked,
            setLastCardFlipped,
        };
    },
}

</script>