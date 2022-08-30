const express = require("express");
const socket = require("socket.io");

const app = express();
app.use(express.static("public"));

let port = process.env.PORT || 3000;
let server = app.listen(port, ()=> {
    console.log("listing to port "+port);
})

let io =socket(server);
io.on("connection", (socket)=> {
    console.log("Made socket connection");
    //received data in the server from frontend(mycomputer)
    socket.on("beginPath",(data) =>{
            //transfer to connected computers
            io.sockets.emit("beginPath",data);
            // socket.broadcast.emit("beginPath",data);
    })

    socket.on("drawStroke",(data)=>{
        io.sockets.emit("drawStroke",data);
    })

    socket.on("undoRedoCanvas",(data) => {
        io.sockets.emit("undoRedoCanvas",data);
    })

    // socket.on("changeColor",(data)=>{
    //     io.sockets.emit("changeColor",data);
    // })

    
    socket.on("changeColorNWidth",(data)=>{
        io.sockets.emit("changeColorNWidth",data);
    })

    // socket.on("changeEraserStroke",(data)=>{
    //     io.sockets.emit("changeEraserStroke",data);
    // })

    // socket.on("changeEraserStrokeColor",(data)=>{
    //     io.sockets.emit("changeEraserStrokeColor",data);
    // })
})