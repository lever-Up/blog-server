
/* 首字母变大写 */
function ucFirst(str) {
    str = str.toLowerCase();
    str = str.replace(/\b\w+\b/g, function (word) {
        return word.substring(0, 1).toUpperCase() + word.substring(1);
    });
    return str;
}

module.exports = {
    ucFirst
};