let token = '';

export default {
    getToken: () => {
        return token;
    },
    setToken: (val) => {
        token = val;
    },
    // 随机字符 去掉了 字母l、O，数字0、1
    randomCode: (count) => {
        let all = "azxcvbnmsdfghjkqwertyuiopZXCVBNMASDFGHJKLQWERTYUIP23456789";
        let b = "";
        for (let i = 0; i < count; i++) {
            let index = Math.floor(Math.random() * 58);
            b += all.charAt(index);
        }
        return b;
    },
    // 随机6位数字
    randomDigitCode: (count=6) => {
        return Math.random().toString().slice(-count)
    },
    // 时间格式化
    dateFormat: (date, fmt) => {
        if(!date) { date = new Date() }
        let o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (let k in o)
            if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    // toast提示框
    toast: (msg, timeout) => {
        if(msg) {
            timeout = timeout || 2000;

            const doc = window.document;
            let ele = doc.createElement('div');
            ele.className = 'app-toast';
            ele.innerHTML = msg;

            doc.body.appendChild(ele);

            setTimeout(() => {
                doc.body.removeChild(ele);
            }, timeout)
        }
    },
    // 前往登录页
    toLogin: () => {
        location.href = process.env["NODE_ENV"] === "production" ? 'login.html' : 'login.html';
    },
    // 前往首页
    toHome: () => {
        location.href = process.env["NODE_ENV"] === "production" ? 'index.html' : 'index.html';
    }

}