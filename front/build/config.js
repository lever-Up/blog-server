var path = require('path');
module.exports = {
    dev: {
        outputPath: path.resolve(__dirname, '../../static/test'),
        outputPublicPath: './',
        port: 8090
    },
    prod: {
        outputPath: path.resolve(__dirname, '../../static/web'),
        outputPublicPath: './static/'
    }
}
