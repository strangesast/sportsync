const express = require('express');
const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const PORT = parseInt(process.env.SPORTSYNC_DISPLAY_SERVER_PORT || '3000', 10);

app.get('/', (req, res) => {
  res.send('display server');
});

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

var child;

wss.on('connection', (ws, req) => {
  ws.on('message', (msg) => {
    console.log(msg);
    try {
      fs.writeFile('frame.png', new Buffer(msg, 'base64'), (err) => {
        if (err) {
          throw err;
        }
        if (child) {
          child.kill();
        }
        child = spawn('./rpi-rgb-led-matrix/utils/led-image-viewer', ['--led-rows=32', '--led-cols=64', '--led-chain=2', '--led-slowdown-gpio=2', 'frame.png']);
      });
    } catch (err) {
      console.log('failed to save image');
    }
  });
  ws.on('close', () => {
  });
});

server.listen(3000, () => console.log(`SportSync Display Server listening on ${ PORT }`));
