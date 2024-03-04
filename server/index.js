const express=require("express");
const app=express()
const http=require("http");
const cors=require("cors");
const {Server}=require("socket.io");
const { Socket } = require("dgram");
app.use(cors());
const server=http.createServer(app);
const io =new Server(server,{
    cors:{
        origin:"http://localhost:3000",
        methods:["GET","POST"],
    }
});
// io.on('connection', function(socket) {
//     console.log(socket.id);
//     socket.on('room', function(room){
//         socket.join(room);
//     });

//     socket.on('disconnect', function(){
//       console.log("disconnected!");
//     });
// });
io.on("connection",(event)=>
{
console.log(`user connected: ${event.id}`);
event.on("join_room",(data)=>
{

    event.join(data);
    console.log(`User with ID: ${event.id} joined the room:${data}`);
})
event.on("send_message",(data)=>
{
    event.to(data.room).emit("recieve_MSGS",data)

});
event.on("disconnet",()=>
{
    console.log("user disconnected");
})
});
server.listen(3001,()=>
{
    console.log("SERVER RUNNING")
})