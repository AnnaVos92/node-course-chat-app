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

socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">View location</a>')

    // safe method to prevent XSS attacks
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    $('#messages').append(li);
})

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

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        socket.emit('createLocationMessage', {lat, lng});
    }, function () {
        alert('Location not found');
    });
});