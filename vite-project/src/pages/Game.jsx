import React, { useState } from 'react'
import { Chess } from 'chess.js'
const socket = new WebSocket('ws://localhost:8080');
    const chess = new Chess();
    socket.onopen = function(event) {
      console.log('WebSocket is open now.');
      socket.send(JSON.stringify({
        type : "Hello Server"
    }));
};


function Game() {
  const [loading , setLoading] = useState(false);
  const [gameFound , setGameFound] = useState(false);
  const [board,setBoard] = useState(chess.board());
  const [from,setFrom] = useState(null);
  const [color,setColor] = useState("");
  const [moveError,setMoveError] = useState("");
  const handleClick = (row,col) => {
      const location = String.fromCharCode(col+97)+(8-row);
      if(from===null){
        setFrom(location);
        return;
      }
        let valid = true;
        try {
          chess.move({
            from : from,
            to : location
          })
        } catch (error) {
          setMoveError(error.message);
          setTimeout(()=>{
            setMoveError("")
          },2000);
          valid = false;
        }
        setBoard(chess.board());
        if(valid){
          socket.send(JSON.stringify({
            type : "move",
            move : {
              from : from,
              to : location
            }
          }))
          console.log("Succesfull move");
        }
      setFrom(null);
      return;
  }

  socket.onmessage = ({data})=>{
    const message = JSON.parse(data);
    console.log(message);
    if(message.type === "start"){
      setColor(message.color);
      setLoading(false);
      setGameFound(true);
    }
    if(message.type === "move"){
      chess.move(message.move);
      setBoard(chess.board());
    }
  }

  return (
    <div className='flex flex-col w-full h-screen bg-slate-800 flex justify-center items-center'>
      {color===""?null:<p className='font-semibold text-slate-200'>{moveError==="" ? `Your Color is ${color.toUpperCase()} Please enjoy` : moveError}</p>};
      {!gameFound && <div className='w-full h-screen flex justify-center items-center'>
      <button onClick={()=>{
        socket.send(JSON.stringify({
          type:"start"
        }));
        setLoading(true);
      }} className='bg-slate-500 p-10 text-6xl text-slate-950 hover:text-slate-300 hover:opacity-70 rounded-lg shadow-lg hover:p-9 transition-all'>{loading ? <div className='loader'></div> : "Find Game"}</button>
      </div>}
      {gameFound && <div className='flex justify-center items-center flex-col'>
          {board.map((row,rowIndex)=>(
            <div key={rowIndex} className='flex flex-row h-20'>
              {row.map((col,colIndex)=>(
              (((rowIndex+colIndex)%2)===1 ? <div onClick={()=>handleClick(rowIndex,colIndex)} key={colIndex} className='flex justify-center items-center border border-black w-20 h-20 bg-slate-300'>{col !== null ? <img src={`https://www.chess.com/chess-themes/pieces/neo/300/${col.color.charAt(0)}${col.type.charAt(0).toLowerCase()}.png`} alt="" /> : "" }</div> : <div onClick={()=>handleClick(rowIndex,colIndex)} key={colIndex} className='flex justify-center items-center border border-black w-20 h-20 bg-slate-400'>{col !== null ? <img src={`https://www.chess.com/chess-themes/pieces/neo/300/${col.color.charAt(0)}${col.type.charAt(0).toLowerCase()}.png`} alt="" /> : "" }</div>)
              ))}
            </div>
          ))}
      </div>}
    </div>
  )
}

export default Game