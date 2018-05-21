var socket = io();
socket.on('connect',function () {
  console.log('Connected to server');
  var params = jQuery.deparam(window.location.search);
  console.log(params);
  socket.emit('join' , params , function(err){
    if(err)
    {
      alert(err);
      window.location.href='/';
    }
    else {
      console.log('No error');
    }
  });
});
  socket.on('newMessage',function(message){
  console.log('Message ', JSON.stringify(message,2));
  var li = $('<li></li>');
  li.html(`<b>${message.from}</b> <br/> ${message.text}`);
  $('#messages').append(li);
});

socket.on('updateUserList',function (users) {
  // console.log('User : ',users);
  var ol = $('#People');
  ol.html('<ol></ol>');
  users.forEach( function (user) {
    var li = $('<li></li>').text(user);
    ol.append(li);
  });

});

$('#chat-form').on('submit',function(e){
  e.preventDefault();
  socket.emit('createMessage',{
      text : $('#message').val(),
    },function () {
      //Acknowledgement from the server

    });
    $('#message').val("");
    $('#message').css('blur');
  });

// $('input').on('focus',function(){
//   $('input').css("border-color","blue");
// })
