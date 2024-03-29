# Agar Game

Agar is an immersive online multiplayer game where players navigate a dynamic arena as balls, aiming to grow in size by consuming smaller balls and various colored squares. It offers a real-time, interactive gaming experience that supports an unlimited number of concurrent users without the need for personalization or progression systems, focusing on simplicity, fun, and direct competition.

## Overview

The Agar game leverages a web application architecture, utilizing Node.js with the Express framework for the backend, and Vanilla JavaScript with Bootstrap for the frontend. Real-time communication is achieved through WebSockets, allowing for seamless and immediate gameplay. The project is structured into several key components, including server logic, WebSocket handlers, client-side rendering, and utility functions, ensuring a modular and maintainable codebase.

## Features

- **Dynamic Multiplayer Gameplay**: Engage in an ever-changing arena with unlimited players.
- **Real-Time Interaction**: Experience immediate gameplay changes with real-time updates.
- **Customization**: Display your chosen name on your ball for a personalized touch.
- **Growth Mechanics**: Grow by consuming squares and other players, with the challenge increasing as your size does.

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