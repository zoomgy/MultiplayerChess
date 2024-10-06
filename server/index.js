import { WebSocketServer } from "ws";
import { ChessManager } from "./ChessManager.js";

const wss = new WebSocketServer({ port: process.env.PORT || 8080 });
const chessController = new ChessManager();


wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.send(JSON.stringify({
    type : "Hello from chess server"
  }))
  ws.on('message', (message) => {
    chessController.gameController(ws,message);
  });
});
