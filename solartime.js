OFFSET = 0;

function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        callback(false);
    }
}

function calculateOffset(position) {
    var fraction = position.coords.longitude / 180.0;
    // milliseconds * seconds * minutes * hours
    var multiplicand = 1000 * 60 * 60 * 12;
    var milliseconds = fraction * multiplicand;
    return milliseconds;
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function formatDate(date) {
    return pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
}

function formatDelta(ms) {
    var date = new Date(Math.abs(ms));
    return formatDate(date);
}

function displayOffset(position) {
    var milliseconds = calculateOffset(position);
    OFFSET = milliseconds;
    var message;
    if (milliseconds > 0.0) {
        message = formatDelta(milliseconds) + ' ahead of UTC';
    }
    else if (milliseconds < 0.0) {
        message = formatDelta(milliseconds) + ' behind UTC';
    }
    else {
        message = ' even with UTC';
    }
    element = document.getElementById('localoffset');
    element.innerText = message;
}

function startTime() {
    var today=Date.now();
    today += OFFSET;
    today = new Date(today);
    document.getElementById('localtime').innerHTML = formatDate(today);
    var t = setTimeout(function(){startTime()},500);
}

getLocation(displayOffset);
