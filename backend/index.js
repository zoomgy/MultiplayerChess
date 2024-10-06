import { WebSocketServer } from "ws";
import { ChessManager } from "./ChessManager.js";

const wss = new WebSocketServer({ port: 8080 });
const chessController = new ChessManager();

console.log('WebSocket server is running on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({
    type : "Hello from chess server"
  }))
  ws.on('message', (message) => {
    chessController.gameController(ws,message);
  });
});
