const express = require('express');
// const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const bodyParser = require('body-parser');
const path = require('path');
const socket = require('socket.io');
const db = require('./db/connect.js');
const routes = require('./routes.js');
const PeerServer = require('peer').PeerServer;
const app = express();
const compiler = webpack(webpackConfig);

app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'));
app.use('/', routes);

app.set('port', (process.env.PORT || 3000));

// app.use(webpackDevMiddleware(compiler, {
//   hot: true,
//   filename: 'bundle.js',
//   publicPath: '/',
//   stats: {
//     colors: true,
//   },
//   historyApiFallback: true,
// }));

const expressServer = app.listen(app.get('port'), () => {
  console.log(`Listening on ${app.get('port')}`);
});

// socket setup
const io = socket(expressServer);
const peerServer = new PeerServer({ port: 9000, path: '/play' });

peerServer.on('connection', (id) => {
  io.emit(Topics.USER_CONNECTED, id);
  console.log(`User connected with # ${id}`);
});

peerServer.on('disconnect', (id) => {
  io.emit(Topics.USER_DISCONNECTED, id);
  console.log(`User #${id} disconnected.`);
})


// io.on('connection', (socket) => {

//   console.log('made socket connection', socket.id);
//   socket.on('disconnect', () => console.log('Client disconnected'));
//   // Handle chat event
//   socket.on('chat', function(data){
//     // console.log(data);
//     io.sockets.emit('chat', data);
//   });
//   socket.on('typing', (data) => {
//     socket.broadcast.emit('typing', data)
//   })
// });
