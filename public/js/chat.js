var socket = io();

function scrollToBottom() {
    // selectors
    var messages = $('#messages');
    var newMessage = messages.children('li:last-child');

    // heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        console.log('should scroll');
        messages.scrollTop(scrollHeight);
    } else if (newMessage.prev().length != 0) {
        console.log('new message below');
    }
}

// use regular functions for cross platform compatibility
socket.on('connect', function () {
    var params = $.deparam(window.location.search);

    socket.emit('join', params, function (err) {
        if (err) {
            window.location.href = '/';
            alert(err);
        } else {
            console.log('no error');
        }
    });
});

socket.on('disconnect', function () {
    console.log('disconnected from server');
});

socket.on('updateUserList', function (users) {
    var ol = $('<ol></ol>');

    users.forEach(function (user) {
        ol.append($('<li></li>').text(user));
    });

    $('#users').html(ol);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        time: formattedTime,
        from: message.from
    });

    $('#messages').append(html);
    scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // var li = $('<li></li>');
    // var a = $('<a target="_blank">View location</a>')

    // // safe method to prevent XSS attacks
    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);

    // $('#messages').append(li);
    
    var template = $('#location-message-template').html();
    var html = Mustache.render(template, {
        url: message.url,
        time: formattedTime,
        from: message.from
    });

    $('#messages').append(html);
    scrollToBottom();
})

$('#message-form').on('submit', function (e) {
    // prevent page from refreshing on submit
    e.preventDefault();

    var input = $('#message-field');

    socket.emit('createMessage', {
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