import React from 'react'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <div className='w-full h-screen bg-slate-800 flex justify-center items-center'>
          <button onClick={()=>(navigate("/game"))} className='bg-slate-500 p-10 text-6xl text-slate-950 hover:text-slate-300 hover:opacity-70 rounded-lg shadow-lg hover:p-9 transition-all'>Play Chess Online</button>
      </div>
    </div>
  )
}

export default Home