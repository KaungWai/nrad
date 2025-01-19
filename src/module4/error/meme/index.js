const getBurmeseNumber = require('./lib/getBurmeseNumber.js');

function testGetBurmeseNumber(num) {
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
testGetBurmeseNumber(300);
testGetBurmeseNumber(200);
testGetBurmeseNumber(102.3);
// testGetBurmeseNumber(-1);