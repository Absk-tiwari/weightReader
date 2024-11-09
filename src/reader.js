const { SerialPort } = require('serialport');

const express = require('express');
const http = require('http');
const { WebSocketServer } = require('ws');
const {ReadlineParser} = require('@serialport/parser-readline');
const axios = require('axios');

// const app = express();
// const server = http.createServer(app);
const sockserver = new WebSocketServer({ port:443 });
// const wss = new WebSocket.Server({ server });

// Set up WebSocket connection
sockserver.on('connection', (ws) => {
    // console.log('WebSocket client connected');
    ws.on('message', (message) => {
        sockserver.clients.forEach( c => {
            console.log(`distributing message: ${message}`)
            c.send(`${message}`);
        })
        // console.log('Received:', message);
    });
});

// Replace 'COM3' with the port of your weighing scale and set correct baud rate
// const port = new SerialPort( {path:'COM3', baudRate: 9600, parity:'none', encoding:'utf8' });
// const parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));

// // Read data from the weighing scale and send via WebSocket and/or to Laravel
// parser.on('data', async (data) => {
//     console.log('Weight:', data);
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(data);
//         }
//     });

//     // Send data to Laravel API endpoint
// });

// server.listen(3001, () => {
//     console.log('Node.js server is running on port 3001');
// });