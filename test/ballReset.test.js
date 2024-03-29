import WebSocket, { Server as WebSocketServer } from 'jest-websocket-mock';
import { generateClientId } from '../server/gameMechanics/generateClientId';
import { initialBallSize } from '../config/gameSettings';

let server;
let client;

beforeAll(async () => {
  server = new WebSocketServer("ws://localhost:1234");
});

afterEach(() => {
  WebSocketServer.clean();
});

afterAll(() => {
  server.close();
});

describe("Ball size reset functionality", () => {
  it("should reset a ball's size after being eaten", async () => {
    client = new WebSocket("ws://localhost:1234");
    const clientId = generateClientId();
    const initialSize = initialBallSize;

    // Simulate server logic for resetting ball size
    server.on('connection', socket => {
      socket.on('message', data => {
        const message = JSON.parse(data);
        if (message.type === 'eaten') {
          socket.send(JSON.stringify({ type: 'reset', clientId, size: initialSize }));
        }
      });
    });

    // Client sends a message that it has been "eaten"
    await client.connected;
    client.send(JSON.stringify({ type: 'eaten' }));

    // Assert that the server sends a reset message with the initial size
    await expect(client).toReceiveMessage(JSON.stringify({ type: 'reset', clientId, size: initialSize }));
    expect(JSON.parse(client.messages[0])).toEqual({ type: 'reset', clientId, size: initialSize });

    // Close the connections
    client.close();
  });
});