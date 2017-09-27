const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('socket.io');
const db = require('./db/connect.js');
const routes = require('./routes.js');

const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use('/app', routes);

app.set('port', (process.env.PORT || 3000));

app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

const server = app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});

//socket setup
const io = socket(server);

io.on('connection', (client) => {
  client.on('subscribeToTimer', (interval) => {
    console.log('----client is subscribing to timer with interval ', interval);
    setInterval(() => {
      client.emit('timer', new Date());
    }, interval);
  });
})
