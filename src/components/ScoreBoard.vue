<template>
    <div id="scoreboard">
        <h2>Score</h2>
        <div class="player-one">
            <p>Player 1: {{props.player1}}</p>
        </div>
        <div class="player-two">
            <p>Player 2: {{props.player2}}</p>
        </div>
    </div>
</template>

<script setup>
    const props = defineProps({
        player1: Number,
        player2: Number,
    })
</script>