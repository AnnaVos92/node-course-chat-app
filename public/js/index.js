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

    var input = $('#message-field');

    socket.emit('createMessage', {
        from: 'User',
        text: input.val()
    }, function () {
        input.val('');
    });

});

var locationButton = $('#send-location');
locationButton.on('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser');
    }

    locationButton.attr('disabled', 'disabled');
    locationButton.text('Sending location...')

    navigator.geolocation.getCurrentPosition(function (position) {
        var lat = position.coords.latitude;
        var lng = position.coords.longitude;

        socket.emit('createLocationMessage', {lat, lng});

        locationButton.removeAttr('disabled');
        locationButton.text('Send location');
    }, function () {
        alert('Location not found');
    });
});