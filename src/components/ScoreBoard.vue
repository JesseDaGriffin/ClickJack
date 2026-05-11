<template>
    <div id="scoreboard">
        <h2 id="scoreboard-title">Score</h2>
        <div id="scoreboard-grid">
            <div>Player 1</div>
            <div>Player 2</div>
            <div class="score-count" :class="{
                'animate-score': gameStore.scoreStatus.player === 'player1' && gameStore.scoreStatus.status !== '',
                'score-green': gameStore.scoreStatus.player === 'player1' && gameStore.scoreStatus.status === 'scored',
                'score-red': gameStore.scoreStatus.player === 'player1' && gameStore.scoreStatus.status === 'lost'
            }">{{ gameStore.score.player1 }}</div>
            <div class="score-count" :class="{
                'animate-score': gameStore.scoreStatus.player === 'player2' && gameStore.scoreStatus.status !== '',
                'score-green': gameStore.scoreStatus.player === 'player2' && gameStore.scoreStatus.status === 'scored',
                'score-red': gameStore.scoreStatus.player === 'player2' && gameStore.scoreStatus.status === 'lost'
            }">{{ gameStore.score.player2 }}</div>
        </div>
    </div>
</template>

<script setup>
    import { useGameStore} from '@/assets/stores/game'

    const gameStore = useGameStore()
</script>