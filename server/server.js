const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const publicPath=path.join(__dirname , '../public');
const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket)=>{
  console.log('New User Connected');

  socket.emit('newMessage',{
    from : 'Sender',
    body : 'Hey There' ,
    createdAt : Date().toLocaleString()
  });

  socket.on('createMessage',function(message){
    console.log('Message ', JSON.stringify(message,2));
  });

});

app.use(express.static( publicPath ));

server.listen(port , ()=>{
  console.log('Server is up on port '+ port);
});
