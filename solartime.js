function getLocation(callback) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        callback(false);
    }
}

function calculateOffset(position) {
    fraction = position.coords.longitude / 180.0;
    // milliseconds * seconds * minutes * hours
    multiplicand = 1000 * 60 * 60 * 12;
    milliseconds = fraction * multiplicand;
    return milliseconds;
}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function formatDelta(ms) {
    // x = ms / 1000
    // seconds = x % 60
    // x /= 60
    // minutes = x % 60
    // x /= 60
    // hours = x % 24
    // return hours.toString() + ':' + minutes.toString() + ':' + seconds.toString();
    date = new Date(ms);
    return pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
}

function displayOffset(position) {
    milliseconds = calculateOffset(position);
    console.log(milliseconds);
    if (milliseconds > 0.0) {
        message = formatDelta(milliseconds) + ' ahead of UTC';
    }
    else if (milliseconds < 0.0) {
        message = formatDelta(milliseconds) + ' behind UTC';
    }
    else {
        message = ' even with UTC';
    }
    element = document.getElementById('offset');
    element.innerText = message;
}

getLocation(displayOffset);
