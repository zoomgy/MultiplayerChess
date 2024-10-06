import { Chess } from "chess.js";

export class Game{
    player1;
    player2;
    board;
    moveCount = 0;
    constructor(player1,player2){
        this.moveCount = 0;
        this.player1 = player1;
        this.player2 = player2;
        this.player1.send(JSON.stringify({
            type : "start",
            color : "white"
        }))
        this.player2.send(JSON.stringify({
            type : "start",
            color : "black"
        }))
        this.player1.on('close', () => {
            console.log(this.board.ascii());
            console.log("Disconnected Client One");
            this.player2.send(JSON.stringify({
                type : "error",
                error : "Other Client Left"
            }))
        });
        this.player2.on('close', () => {
            console.log(this.board.ascii());
            console.log("Disconnected Client Two");
            this.player1.send(JSON.stringify({
                type : "error",
                error : "Other Client GOT disconnected"
            }))
        });
        this.board = new Chess();
    }
    move(socket,move){
        if(this.moveCount%2 === 0 && socket === this.player2){
            this.player2.send(JSON.stringify({
                type : "error",
                error : "It is not your chance"
            }))
            return;    
        }
        if(this.moveCount%2 === 1 && socket === this.player1){
            this.player1.send(JSON.stringify({
                type : "error",
                error : "It is not your chance"
            }))
            return;   
        }
        try {
            this.board.move(move);
        } catch (error) {
            console.log(error.message);
        }
        if(this.moveCount%2===0){
            this.player2.send(JSON.stringify({
                type : "move",
                move
            }))
        }
        if(this.moveCount%2===1){
            this.player1.send(JSON.stringify({
                type : "move",
                move
            }));
        }
        this.moveCount++;
    }
}