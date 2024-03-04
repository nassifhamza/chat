import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope,faCircle } from '@fortawesome/free-solid-svg-icons'

const IMGARR=["pexels-pixabay-373543.jpg","ARIAANDACCESSEBILITY.png","Screenshot2024-01-22153054.png","semantics.png"];

function CHAT({socket,username,room})
{
    const [MESSAGE,SETMESSAGE]=useState("");
    const [index,setindex]=useState(0);

    const [MESSAGELIST,SETMESSAGELIST]=useState([]);
    const sendmessage= async() =>
    {
        if(MESSAGE!=="")
        {
            let currentDate = new Date();
let options = { hour: '2-digit', minute: '2-digit' };
let am_pm = currentDate.toLocaleTimeString([], options);

            const MESSAGEDATA={
                room:room,
                MSG:MESSAGE,
                author:username,
                // time:new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes(),
                time:am_pm,
            }

            await socket.emit("send_message",MESSAGEDATA);
            SETMESSAGELIST((LIST)=>[...LIST,MESSAGEDATA]);
           SETMESSAGE("");
        }
    }

    useEffect(() => {
        socket.off("recieve_MSGS").on("recieve_MSGS", (data) => {
    
         SETMESSAGELIST((LIST)=>[...LIST,data]);
        }); 
        
      },[socket]);
     
//    useEffect(()=>
//    {
//     socket.on("recieve_MSGS",(data)=>
//     {
//         console.log(data)
//     })
//    },[socket]);
    return(
   
        // style={{backgroundImage:`url(${IMGARR[index]})`,backgroundSize:"cover",height:"100vh"}}
        <div className="GLOBAL">
    
      <div className="chat-window">
        <div className="chat-header"><p> 
        <FontAwesomeIcon id="ICO" icon={faCircle} />
 
     LIVE CHAT</p></div>
        <div className="chat-body">  

        <ScrollToBottom  className="message-container">
        {
            MESSAGELIST.map(EL=>
            {
                return ( 
                    <div className="message" id={username===EL.author ?"you" :"other"}> 
                    
                    <div>
                        <div className="message-content"> <p>{EL.MSG}</p></div>
                        <div className="message-meta"> <p id="time">{EL.time}</p>
                        <p id="author">{EL.author===username ?"YOU": EL.author}</p>
                        </div>
                    </div>
                    
                    
                    </div>
                )
            })
        }
        </ScrollToBottom>
        </div>
        <div className="chat-footer"> <input id="FIELD" style={{borderBottomLeftRadius:"5px",borderBottomRightRadius:"5px"}} type="text" placeholder="TYPE A MESSAGE" onChange={(event=>{SETMESSAGE(event.target.value)})} onKeyPress={(event)=>
        {
            event.key==="Enter" && sendmessage() 
if(event.key==="Enter")
            document.getElementById("FIELD").value="";

        }}/><button onClick={(event)=>
        {
            sendmessage();
            document.getElementById("FIELD").value="";
        }} style={{backgroundColor:"RED"}} >&#9658;</button></div>

        </div>
        </div>
    
    )
}
export default CHAT;



