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
import { useSound } from '@/composables/useSound';
    
const gameStore = useGameStore();
const deckStore = useDeckStore();
const sound = useSound();

watch(() => gameStore.gameState.gameStarted, (isGameStarted) => {
    if(isGameStarted) {
        startGame();
    }
});



watch(() => gameStore.gameState.continueGameLoop, (continueLoop) => {
    if(continueLoop && deckStore.deckCount > 0 && !gameStore.gameState.gamePaused) {
        flipNextCard();
    }
});

watch(() => gameStore.gameState.gamePaused, (isPaused) => {
    if(!isPaused && gameStore.gameState.gameStarted && !gameStore.gameState.gameOver && !gameStore.lastCardFlipped.includes('jack')) {
        gameStore.gameState.continueGameLoop = true;
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

    // Check fast forward
    const jacksLeft = deckStore.gameDeck.filter(c => c.includes('jack')).length;
    if (jacksLeft === 0 && !randomCard.includes('jack')) {
        gameStore.gameState.fastForward = true;
    }

    // Flip card
    const newCard = document.getElementById("remaining-cards").cloneNode();
    newCard.id = randomCard;
    newCard.className = 'flipped-card';
    
    document.getElementById("deck-area").appendChild(newCard);
    
    // Card flip speed
    const isFF = gameStore.gameState.fastForward;
    const speed = isFF ? 50 : Math.floor(Math.random() * 300) + 50;
    
    const playbackRate = 200 / speed;
    sound.playFlip(playbackRate);
    
    newCard.style["-webkit-animation-duration"] = isFF ? '0.1s' : `${speed / 500}s`;
    newCard.classList.add('move-img');
    setTimeout(() => {
        newCard.src = `/cardFaces/${randomCard}.png`;
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
            if(deckStore.deckCount > 0) {
                if(!gameStore.gameState.gamePaused && !gameStore.gameState.pauseForAnimation) {
                    gameStore.gameState.continueGameLoop = true;
                }
            } else {
                gameStore.gameState.gameOver = true;
            }
        }, isFF ? 100 : 1000);
    }
}
</script>