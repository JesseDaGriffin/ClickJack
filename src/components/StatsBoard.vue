<template>
    <div class="scoreboard">
        <h2 class="scoreboard-title">Deck Stats</h2>
        <div class="scoreboard-grid">
            <div>Cards Left</div>
            <div>Jacks Left</div>
            <div class="score-count">{{ deckStore.deckCount }}</div>
            <div class="score-count">{{ jacksLeft }}</div>
        </div>
    </div>
</template>

<script setup>
    import { computed } from 'vue';
    import { useDeckStore } from '@/assets/stores/deck';
    const deckStore = useDeckStore();
    
    const jacksLeft = computed(() => {
        return deckStore.gameDeck.filter(card => card.includes('jack')).length;
    });
</script>
