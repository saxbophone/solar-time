// solartime.js - by Joshua Saxby

// Javascript code to show the exact solar time for a user's location
// this uses the HTML5 geolocation API

OFFSET = 0;

function getLocation(callback) {
    // try to get location from browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(callback);
    } else {
        callback(false);
    }
}

function calculateOffset(position) {
    // this calculates the offset from UTC in milliseconds
    var fraction = position.coords.longitude / 180.0;
    // milliseconds * seconds * minutes * hours
    var multiplicand = 1000 * 60 * 60 * 12;
    var milliseconds = fraction * multiplicand;
    return milliseconds;
}

function pad(n) {
    // pad numbers to 2 digits
    return (n < 10) ? ("0" + n) : n;
}

function formatDate(date) {
    // display date as HH:MM:SS format
    return pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
}

function formatDelta(ms) {
    // show absolute value of timedelta in milliseconds as date
    var date = new Date(Math.abs(ms));
    return formatDate(date);
}

function displayOffset(position) {
    // from position information, calculate offset, store it and update the web page
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
    // coninually-looping function that updates the clock
    var today=Date.now();
    today += OFFSET;
    today = new Date(today);
    document.getElementById('localtime').innerHTML = formatDate(today);
    var t = setTimeout(function(){startTime()},500);
}

getLocation(displayOffset);
