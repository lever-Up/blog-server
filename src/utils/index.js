/**
 * 工具类
 */
const Utils = {
    // 首字母变大写
    ucFirst: (str) => {
        str = str.toLowerCase();
        str = str.replace(/\b\w+\b/g, function (word) {
            return word.substring(0, 1).toUpperCase() + word.substring(1);
        });
        return str;
    },
    // 空对象
    isEmpty: (obj) => {
        return Object.keys(obj).length === 0 && obj.constructor === Object
    }
};

module.exports = Utils;