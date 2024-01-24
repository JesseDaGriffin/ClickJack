<template>
    <div id="deck-area">
        <div id="flipped-position">
            <!-- <img id="flipped-cards" class="deck" src="../assets/cardBack.png"/> -->
        </div>
        <div id="deck-position" @click="startGame()">
            <img id="remaining-cards" class="deck" src="../assets/cardBack.png"/>
        </div>
    </div>
</template>

<script>
import { ref, onMounted, computed, watch } from 'vue';
    
export default {
    props: {
        continueGameLoop: Boolean,
        gameStarted: Boolean,
    },
    emits: ['set-game-started', 'set-continue-game-loop', 'set-last-card-flipped'],
    setup(props, ctx) {
        watch(() => props.continueGameLoop, (value) => {
            if(value) {
                flipNextCard();
            }
        });
        const setContinueGameLoopChild = (value) => {
            ctx.emit('set-continue-game-loop', value);
        }

        const setGameStartedChild = (value) => {
            ctx.emit('set-game-started', value);
        }

        const setLastCardFlippedChild = (value) => {
            ctx.emit('set-last-card-flipped', value);
        }
        
        const deck = ref([]);
        const numberOfDecks = 2;

        const startGame = () => {
            if(props.gameStarted === false) {
                console.log('Game started!');
                setGameStartedChild(true);
                setContinueGameLoopChild(true);
            }
        }

        const flipNextCard = () => {
            setContinueGameLoopChild(false);
            // Get next card
            const randomIndex = Math.floor(Math.random() * deck.value.length);
            const randomCard = deck.value[randomIndex];

            // Remove card from deck
            deck.value.splice(randomIndex, 1)

            // Set last card flipped
            setLastCardFlippedChild(randomCard);

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
            if(deck.value.length === 0) {
                document.getElementById("remaining-cards").remove();
            }

            // Stop game loop if card is a jack
            if(randomCard.includes('jack')) {
                // ctx.emit('set-continue-game-loop', false);
                setContinueGameLoopChild(false);
            } else {
                setTimeout(() => {
                    setContinueGameLoopChild(true);
                }, 1000);
            }
        }

        onMounted(() => {
            deck.value = [
                '2_of_clubs',
                '2_of_diamonds',
                '2_of_hearts',
                '2_of_spades',
                '3_of_clubs',
                '3_of_diamonds',
                '3_of_hearts',
                '3_of_spades',
                '4_of_clubs',
                '4_of_diamonds',
                '4_of_hearts',
                '4_of_spades',
                '5_of_clubs',
                '5_of_diamonds',
                '5_of_hearts',
                '5_of_spades',
                '6_of_clubs',
                '6_of_diamonds',
                '6_of_hearts',
                '6_of_spades',
                '7_of_clubs',
                '7_of_diamonds',
                '7_of_hearts',
                '7_of_spades',
                '8_of_clubs',
                '8_of_diamonds',
                '8_of_hearts',
                '8_of_spades',
                '9_of_clubs',
                '9_of_diamonds',
                '9_of_hearts',
                '9_of_spades',
                '10_of_clubs',
                '10_of_diamonds',
                '10_of_hearts',
                '10_of_spades',
                'ace_of_clubs',
                'ace_of_diamonds',
                'ace_of_hearts',
                'ace_of_spades',
                'jack_of_clubs2',
                'jack_of_diamonds2',
                'jack_of_hearts2',
                'jack_of_spades2',
                'king_of_clubs2',
                'king_of_diamonds2',
                'king_of_hearts2',
                'king_of_spades2',
                'queen_of_clubs2',
                'queen_of_diamonds2',
                'queen_of_hearts2',
                'queen_of_spades2'
            ];

            // Add more decks
            let deckCopy = deck.value.slice();
            for(let i = 1; i < numberOfDecks; i++) {
                deck.value = deck.value.concat(deckCopy);
            }
        });

        return {
            deck,
            startGame,
            flipNextCard,
        };
    }
}
</script>