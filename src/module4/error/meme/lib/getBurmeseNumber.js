var myanmarNumbers = require("myanmar-numbers");

function getBurmeseNumber(num) {
    if (!Number.isInteger(num)) {
        throw new TypeError('Number must be an integer value.');
    }
    if ((num < 0) || (num > Number.MAX_SAFE_INTEGER)) {
        throw new RangeError('Number must be an integer value between 0 and Max integer.');
    }

    return myanmarNumbers(num, 'my');
}

module.exports = getBurmeseNumber;

