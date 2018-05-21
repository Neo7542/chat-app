const http = require('http');
const express = require('express');
const path = require('path');
const socketIO = require('socket.io');

const publicPath=path.join(__dirname , '../public');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000 ;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


io.on('connection',(socket)=>{
  console.log('New User Connected');


  socket.on('join',(params,callback)=>{

    if(!isRealString(params.name) || !isRealString(params.room))
    {
      return callback('Name and room are required');
    }
    socket.join(params.room);

    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);


    io.to(params.room).emit('updateUserList' ,  users.getUserNames(params.room));


    socket.emit('newMessage',{
      from : 'Admin' , text : 'Welcome to the Chat App'
    });
    socket.broadcast.to(params.room).emit('newMessage',{
      from : 'Admin' , text : `${params.name} has joined the room`
    });

    callback();

    socket.on('disconnect',()=>{
      users.removeUser(socket.id);

      io.to(params.room).emit('updateUserList', users.getUserNames(params.room));
      //io.to().emit();
    })
  });

  socket.on('createMessage',function(message){
    // console.log('Message ', JSON.stringify(message,2));
    var user = users.getUser(socket.id);
    if(isRealString(message.text))
    {
      io.to(user.room).emit('newMessage',{
        from : user.name ,
        text : message.text ,
        createdAt : Date().toLocaleString()
      });
    }
  });
});

app.use(express.static( publicPath ));

server.listen(port , ()=>{
  console.log('Server is up on port '+ port);
});
