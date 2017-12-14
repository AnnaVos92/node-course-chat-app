var socket = io();

// use regular functions for cross platform compatibility
socket.on('connect', function () {
    console.log('connected to server');

    // socket.emit('createMessage', {
    //     to: 'Anna',
    //     text: 'hi'
    // });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('new message from', message);
    var li = $('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    $('#messages').append(li);
});

$('#message-form').on('submit', function (e) {
    // prevent page from refreshing on submit
    e.preventDefault();

    socket.emit('createMessage', {
        from: 'User',
        text: $('[name=message]').val()
    }, function () {
        //
    });

    $('#message-field').val('');
});