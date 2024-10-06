
# Chess Application

This is a real-time chess application built with **React** on the front end and **WebSocket** for bi-directional communication between the client and server. Players can play chess games online, with moves being transmitted instantly between clients.

## Features

- **Real-time gameplay**: Moves are updated in real-time between players using WebSocket.
- **Chess engine**: The application uses the `chess.js` library to handle game logic and ensure valid moves.
- **Multiplayer**: Players are automatically matched with each other.
- **Responsive UI**: The game board updates dynamically with each move.
- **Error handling**: Displays errors for invalid moves.

## Tech Stack

- **Frontend**: React, WebSocket
- **Backend**: Node.js, WebSocket Server
- **Chess Logic**: `chess.js` library

## Installation

### Prerequisites

- Node.js installed on your system
- Web browser that supports JavaScript

### Steps

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-repo/chess-websocket.git
   cd chess-websocket
   ```

2. **Install dependencies for frontend and backend**

   Navigate to the client and server directories and install the required packages:

   ```bash
   # Install frontend dependencies
   cd client
   npm install

   # Install backend dependencies
   cd ../server
   npm install
   ```

3. **Start the WebSocket server**

   In the server directory:

   ```bash
   node server.js
   ```

4. **Run the React application**

   In the client directory:

   ```bash
   npm start
   ```

   This will start the development server and open the app in your default web browser at `http://localhost:3000`.

## How to Play

1. Once the application is running, click the **Find Game** button to start looking for an opponent.
2. When an opponent is found, you will be assigned either the white or black pieces.
3. Make moves by clicking the piece you want to move, then clicking the square you want to move to.
4. The game will update in real-time as both players make their moves.

## Code Overview

### Frontend

- **WebSocket connection**: The client establishes a WebSocket connection to the server.
- **Game state management**: The application uses React's `useState` to manage the game state, board configuration, and errors.
- **Board rendering**: The chessboard is rendered using HTML/CSS, with each piece represented by an image fetched from Chess.com.

### Backend

- **WebSocket Server**: Handles player connections, game initialization, and move processing.
- **GameController**: Manages games, pairing players and routing messages between them.
- **Game**: Represents an individual chess game, handling moves and updating the board using `chess.js`.

## Future Enhancements

- Implement a database to store user profiles and game history.
- Add support for more than two players or spectators.
- Improve the UI with custom styling and animations.

## Contributing

Feel free to fork this repository and submit pull requests for any enhancements or bug fixes.