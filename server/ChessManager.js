import { Game } from "./Game.js";
export class ChessManager{
    games = [];
    alreadyWaitingUser = null;
    gameController(socket,key){
        const message = JSON.parse(key);
        if(message.type === "start"){
            if(this.alreadyWaitingUser){
                const game = new Game(this.alreadyWaitingUser,socket);
                this.games.push(game);
                this.alreadyWaitingUser = null;
            }else{
                this.alreadyWaitingUser = socket;
            }
        }
        if(message.type === "move"){
            const game = this.games.find((game)=>game.player1 === socket || game.player2 === socket);
            if(game){
                game.move(socket,message.move);
            }else{
                socket.send(JSON.stringify({
                    type : "error",
                    error : "Please start a game first"
                }));
            }
        }
        if(message.type === "error"){
            console.log(message.error);
        }
    }
}