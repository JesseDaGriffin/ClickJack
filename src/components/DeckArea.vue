<template>
    <div id="deck-area">
        <div id="flipped-position"></div>
        <div id="deck-position">
            <img id="remaining-cards" class="deck" src="../assets/cardBack.png"/>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

import { useGameStore } from '@/assets/stores/game';
import { useDeckStore } from '@/assets/stores/deck';
    
const gameStore = useGameStore();
const deckStore = useDeckStore();

watch(() => gameStore.gameState.gameStarted, (isGameStarted) => {
    if(isGameStarted) {
        startGame();
    }
});

watch(() => gameStore.gameState.gameOver, (isGameOver) => {
    if(isGameOver) {
        alert('Game Over!');
    }
});

watch(() => gameStore.gameState.continueGameLoop, (continueLoop) => {
    if(continueLoop && deckStore.deckCount > 0) {
        flipNextCard();
    }
});

const startGame = () => {
    deckStore.createDeck();
    gameStore.gameState.continueGameLoop = true;
}

const flipNextCard = () => {
    gameStore.gameState.continueGameLoop = false;
    // Get next card
    const randomIndex = Math.floor(Math.random() * deckStore.deckCount);
    const randomCard = deckStore.gameDeck[randomIndex];

    // Remove card from deck
    deckStore.gameDeck.splice(randomIndex, 1)

    // Set last card flipped
    gameStore.lastCardFlipped = randomCard;

    // Flip card
    const newCard = document.getElementById("remaining-cards").cloneNode();
    newCard.src = '../src/assets/cardBack.png';
    newCard.id = randomCard;
    newCard.className = 'flipped-card';
    
    document.getElementById("deck-area").appendChild(newCard);
    
    // Card flip speed
    const speed = Math.floor(Math.random() * 300) + 50;
    newCard.style["-webkit-animation-duration"] = `${speed / 500}s`;
    newCard.classList.add('move-img');
    setTimeout(() => {
        newCard.src = `../src/assets/cardFaces/${randomCard}.png`;
    }, speed);

    // Remove card back if last card in deck
    if(deckStore.deckCount === 0) {
        document.getElementById("remaining-cards").remove();
    }

    // Stop game loop if card is a jack
    if(randomCard.includes('jack')) {
        gameStore.gameState.continueGameLoop = false;
    } else {
        setTimeout(() => {
            gameStore.gameState.continueGameLoop = true;
        }, 1000);
    }
}
</script>