var socket = io();
socket.on('connect',function () {
  console.log('Connected to server');



  // socket.emit('createMessage',{
  //   to: 'Reciever' ,
  //   body : 'Hey bro'
  // });
});

socket.on('newMessage',function(message){
  console.log('Message ', JSON.stringify(message,2));
});
