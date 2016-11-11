var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack.config');

var port = 4002;
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.get('/index2', function (req, res) {
    res.sendFile(path.join(__dirname, './src/tmp/index2.html'));
});

app.get('/index3', function (req, res) {
    res.sendFile(path.join(__dirname, './src/index3.html'));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './src/index.html'));
});

app.listen(port, function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> 🚧  Webpack development server listening on port %s', port);
    }
});
