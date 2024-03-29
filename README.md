# Agar Game

Agar is an engaging online multiplayer ball chase game that offers a dynamic and interactive gameplay experience. Players control their balls, navigating through a space filled with colorful squares and other players, aiming to grow by consuming smaller entities. The game is designed to support an unlimited number of concurrent users, emphasizing fun, competition, and direct interaction without the need for user identification or progress tracking.

## Overview

The game is developed as a web application using Node.js with the Express framework for the backend, and Vanilla JavaScript with Bootstrap for the frontend. WebSockets facilitate real-time communication between the client and server. The application's structure is modular, featuring separate logic for server handling, WebSocket management, game mechanics, and client-side rendering.

## Features

- **Dynamic Multiplayer Gameplay**: Engage with countless other players in real-time.
- **Real-Time Interaction**: Immediate responses to user actions ensure a fluid gaming experience.
- **Growth Mechanics**: Players grow by consuming squares and other players, with the game's challenge escalating accordingly.
- **Customization**: Players can personalize their balls by displaying their chosen names.

## Getting started

### Requirements

- Node.js installed on your machine.
- A modern web browser supporting WebSockets.

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Start the server with `node server.js`.
4. Open `http://localhost:3000` in your web browser to start playing.

### License

Copyright (c) 2024.