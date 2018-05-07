var path = require('path');
// var path = path.resolve(__dirname,'dist');

module.exports = {
    entry: "./index.js",
    output: {
        path: __dirname + '/dist/',
        filename: "bundle.js",
        publicPath: '/'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }]
    },
    node: {
        fs: "empty",
        net: 'empty',
        tls: 'empty'
    }
};