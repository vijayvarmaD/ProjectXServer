var socket = io.connect('http://localhost:3000');

$(function () {
    var socket = io();
    $('form').submit(function(){
      socket.emit('chat message', $('#m').val());
      $('#m').val('');
      return false;
    });
  });

socket.on('something happened', function(msg){
    console.log('message: ' + msg);
});

socket.on('comm', (msg) => {
    console.log('message: ' + msg);
});
