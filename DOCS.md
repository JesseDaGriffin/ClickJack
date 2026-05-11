# ClickJack Documentation

## Overview
ClickJack is a Vue 3 web-based card game based on Slap Jack. Two players watch as cards are dealt, and race to be the first to "slap" (press their designated key) when a Jack is revealed.

## How the Site Works

### Architecture
- **Framework:** Vue 3 with Vite.
- **State Management:** Pinia is used for game state management (`useGameStore`) and deck management (`useDeckStore`).
- **Routing:** Vue Router handles navigation between the Home Screen and the In-Game view.

### Components
- `App.vue`: The main entry point of the application.
- `pages/Home.vue`: The start screen. Contains a "Play" button to navigate to the game.
- `pages/InGame.vue`: The main game interface containing the `ScoreBoard` and `DeckArea`. Listens for keyboard inputs to start the game and handles player actions.
- `DeckArea.vue`: Manages flipping cards, removing them from the deck, and executing the game loop logic.
- `ScoreBoard.vue`: Displays the current score for Player 1 and Player 2.

### Game State (`useGameStore`)
The game state tracks:
- `gameStarted`: Whether the initial spacebar has been pressed.
- `continueGameLoop`: Whether cards should continue flipping automatically.
- `gameOver`: Reached when the deck is empty.
- `score`: Points accumulated by `player1` and `player2`.
- `lastCardFlipped` & `lastPlayerClicked`: Used to determine if a player correctly slapped a Jack.

## How to Navigate It

### User Interface
1. **Home Screen (`/`)**: This is the initial view. 
    - Click the central **Play** button to transition to the Game Screen.
    - The Settings button is currently a placeholder for future customization options.
2. **In-Game Screen (`/inGame`)**: The main gameplay area.

### Game Controls
- **Spacebar**: Start dealing cards.
- **Left Control Key**: Player 1 action button.
- **Right Control Key**: Player 2 action button.

## Maintenance
*This document should be updated whenever new pages, core components, or controls are added to ClickJack.*
