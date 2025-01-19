export const mtFormatBurmeseNumber = (num) => {
    if (!Number.isInteger(num)) {
        throw new TypeError('Num must be an integer value.')
    }
    else if (num < 0 || num > Number.MAX_SAFE_INTEGER) { // 9007199254740991
        throw new RangeError(`Number must be between 0 and ${Number.MAX_SAFE_INTEGER}`);
    }
    const burmeseDigits = ['၀', '၁', '၂', '၃', '၄', '၅', '၆', '၇', '၈', '၉'];

    const result = num
        .toString()
        .split("")
        .reverse()
        .map((digit, index) =>
            index != 0 && index % 3 === 0 ? `${burmeseDigits[digit]},` : burmeseDigits[digit]
        ).reverse()
        .join("");

    return result
}