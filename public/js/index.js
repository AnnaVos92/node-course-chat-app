var socket = io();

// use regular functions for cross platform compatibility
socket.on('connect', function () {
    console.log('connected to server');

    socket.emit('createMessage', {
        to: 'Anna',
        text: 'hi'
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('new message from', message)
});