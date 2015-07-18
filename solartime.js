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

function formatDelta(ms) {
    var date = new Date(ms);
    return pad(date.getUTCHours()) + ':' + pad(date.getUTCMinutes()) + ':' + pad(date.getUTCSeconds());
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
    var h=today.getUTCHours();
    var m=today.getUTCMinutes();
    var s=today.getUTCSeconds();
    h = pad(h);
    m = pad(m);
    s = pad(s);
    document.getElementById('localtime').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

getLocation(displayOffset);
