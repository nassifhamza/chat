
import { useState } from 'react';
import './App.css';
import io from "socket.io-client";
import CHAT from './CHAT';
const socket=io.connect("http://localhost:3001");
function App() {
  const [username,setUsername]=useState("");
  const [room,setRoom]=useState("");
  const [SHOW,setshow]=useState(false);
  const joinRoom=()=>
  {
if(username!==""&& room!=="")
{
  socket.emit("join_room",room);
  setshow(true);
  
}
  }
  return (
    <div className="App">
{!SHOW ?(
  <div className='container-back'>

    <div className='joinChatContainer'>
    <h3> JOIN A CHAT </h3>
    <input type='text'  placeholder='USERNAME' onChange={(event=>{setUsername(event.target.value)})}/>
    <input type='text' placeholder='ROOM ID' onChange={(event=>{setRoom(event.target.value)})} onKeyPress={(event)=>
        {
            event.key==="Enter" && joinRoom();
        }} />
    <button onClick={joinRoom} >JOIN A ROOM</button>
    </div>
    </div>
)
:
(
    
      <CHAT socket={socket} username={username} room={room} />)}

    </div>

    
  );
}

export default App;


