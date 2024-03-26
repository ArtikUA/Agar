# Agar Game

Agar is an engaging and innovative online real-time ball chase game designed to provide a seamless multiplayer experience. Players navigate a dynamic environment, controlling a ball that grows by consuming smaller squares and other balls. With its web-based architecture, Agar offers easy access and real-time interaction for an unlimited number of concurrent players, emphasizing simplicity, fun, and competitive gameplay.

## Overview

Agar utilizes a scalable web application architecture, employing Node.js and the Express framework for the backend, and Vanilla JavaScript with Bootstrap for the frontend. The application leverages WebSockets for efficient real-time communication between the server and clients. This setup ensures a responsive and engaging user experience across various devices without the need for external databases, as all necessary information is maintained in memory.

## Features

- **Dynamic Multiplayer Gameplay**: Real-time interaction with countless players worldwide.
- **Growth Mechanics**: Increase your ball's size by consuming squares and smaller balls to dominate the game space.
- **User Personalization**: Enter your name for a personalized gaming experience, visible on your ball.
- **Constrained Game Space**: Navigate a limited area to increase the game's strategic depth.
- **Modular Codebase**: A well-organized, maintainable codebase that simplifies future development and enhancements.

## Getting Started

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