/*In production (heroku) the connection has to be made to:
 ** https://freecodecamp-edmonton-chatroom.herokuapp.com/
 ** not to: https://my-chat-app-ferbarra2207.c9users.io/ if you are using cloud 9.
 ** If running locally on your machine set it to http://localhost:"whatever port being use"
*/

/* global $ */

var socket = io.connect('https://my-chat-app-ferbarra2207.c9users.io/');
//var socket = io.connect('https://uselesschat.herokuapp.com/');
            
socket.on('connect', function(data) {
    var nickname = prompt('Choose a nickname');
    // check that the nickname isn't empty.
    if (nickname !== '') {
        socket.emit('join', nickname);
    }
});
            
socket.on('update active users list', function(user) {
    $(`<li data-name="${user}">${user}</li>`).appendTo('#users > ul');
});
   
socket.on('user joined', function(newUserMessage) {
    $(`<p><strong>${newUserMessage}</strong></p>`).appendTo('#messages');
});
         
socket.on('remove user', function(user, message) {
    //remove the users name from the #users.
    $(`#users > ul > li[data-name=${user}]`).remove();
    // "user has left" message appended in #messages.
    $(`<p><strong>${message}</strong></p>`).appendTo('#messages');
});
            
socket.on('messages', function(message) {
    $(`<p>${message}</p>`).appendTo('#messages');
});

socket.on('notify disconnection', function(data) {
    alert('You have been disconnected');
});
            
$(document).ready(function() {
    $('form').submit(function(e) {
        e.preventDefault();
        var message = $('#message').val();
                    
        if (typeof message === 'string' && message !== '') {
            socket.emit('messages', message);
            $('#message').val('');
        }
    });
            
});
