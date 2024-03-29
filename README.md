# Agar Game

Agar is an engaging online multiplayer game where players control balls, navigate a dynamic arena to consume squares, and compete to grow by absorbing smaller balls. It provides a simple, fun, and real-time online experience that supports an unlimited number of concurrent users. The game emphasizes ease of access, casual play, and dynamic interaction without the need for personalization or progression systems.

## Overview

The Agar game is developed as a web application utilizing Node.js with Express for the backend, Vanilla JavaScript with Bootstrap for the frontend, and WebSockets for real-time communication between client and server. Its modular architecture divides the game logic, client-side rendering, and WebSocket management into separate modules for maintainability and scalability. Notably, the game features a dynamic game space where users can see their names displayed on their balls, enhancing the multiplayer experience.

## Features

- **Dynamic Multiplayer Gameplay**: Navigate and grow your ball in a shared space with other players.
- **Real-Time Interaction**: Experience smooth gameplay with real-time updates and interactions.
- **Customizable Appearances**: Initially, balls are randomly colored, and players can display their chosen names on their balls.
- **Engaging Objectives**: Grow by consuming squares and other balls, with gameplay becoming more challenging as you grow.

## Getting started

### Requirements

- Node.js installed on your machine.
- A modern web browser supporting WebSockets.

### Quickstart

1. Clone the repository to your local machine.
2. Navigate to the project directory and run `npm install` to install dependencies.
3. Start the server with `node server.js`.
4. Open `http://localhost:3000` in your web browser to begin playing.

### License

Copyright (c) 2024.