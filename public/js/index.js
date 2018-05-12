var socket = io();
socket.on('connect',function () {
  console.log('Connected to server');
});
  socket.on('newMessage',function(message){
  console.log('Message ', JSON.stringify(message,2));
  var li = $('<li></li>');
  li.text(`${message.from} : ${message.text}`);
  $('#messages').append(li);
});

$('#chat-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
     from : 'User',
      text : $('#message').val(),
    },function () {

    });
  });
