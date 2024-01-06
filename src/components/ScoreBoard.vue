<template>
    <div id="scoreboard">
        <h2 id="scoreboard-title">Score</h2>
        <!-- <div class="player-one">
            <p>Player 1: {{props.player1}}</p>
        </div>
        <div class="player-two">
            <p>Player 2: {{props.player2}}</p>
        </div> -->
        <div id="scoreboard-grid">
            <div>Player 1</div>
            <div>Player 2</div>
            <div class="score-count">{{props.player1}}</div>
            <div class="score-count">{{props.player2}}</div>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        player1: Number,
        player2: Number,
    })
</script>