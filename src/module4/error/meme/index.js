const getBurmeseNumber = require('./lib/getBurmeseNumber.js');

function memeFormatBurmeseNumber(num) {
    try {
        console.log(getBurmeseNumber(num));
    } catch (e) {
        if (e instanceof TypeError) {
            console.log('Number must be an integer value.');
        } else if (e instanceof RangeError) {
            console.log('Number must be an integer value between 0 and Max integer.');
        }
    }
}

// Test cases
memeFormatBurmeseNumber(300);
memeFormatBurmeseNumber(200);
memeFormatBurmeseNumber(102.3);
// memeFormatBurmeseNumber(-1);