// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');
// const cors = require('cors');
//
// const app = express();
// const port = process.env.PORT ?? 3000;
//
//
//
//
// app.use(cors());
// const server = http.createServer(app);
// const io = socketIo(server, {
//     cors: {
//         origin: "*",
//         methods: ["GET", "POST"],
//     }
// });
//
//
// io.on('connection', (socket) => {
//     let users = [];
//
//     console.log('Un cliente se ha conectado');
//
//     users.push(socket.id)
//
//     socket.on('deviceInfo', (deviceInfo) => {
//         console.log('Información del dispositivo recibida:', deviceInfo);
//         users = users.filter( user => user !== socket.id)
//     });
//
//     socket.on('messageSend', (message) => {
//         console.log('Mensage a enviar :', message);
//
//         // users.forEach( userId => {
//         //     console.log(userId);
//         io.emit('messageResponse', message);
//         // })
//     });
//
//     // io.emit('notification', 'Conectado al socket');
//
//     socket.on('disconnect', () => {
//         console.log('Un cliente se ha desconectado');
//     });
// });
// //
// // app.use(express.static('public'))
// //
// // app.get('/game', (req, res) => {
// //     res.redirect('game.html');
// // });
// //
// // app.get('/message', (req, res) => {
// //     res.redirect('message.html');
// // });
// //
// // app.get('/', (req, res) => {
// //     res.redirect('index.html');
// // })
//
//
//
// app.listen(port, () => {
//     console.log(`App listening on port ${port}`);
// })

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const port = process.env.PORT ?? 3000;

const app = express();
app.use(cors());
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});


io.on('connection', (socket) => {
    let users = [];

    console.log('Un cliente se ha conectado');

    users.push(socket.id)

    socket.on('deviceInfo', (deviceInfo) => {
        console.log('Información del dispositivo recibida:', deviceInfo);
        users = users.filter( user => user !== socket.id)
    });

    socket.on('messageSend', (message) => {
        console.log('Mensage a enviar :', message);

        // users.forEach( userId => {
        //     console.log(userId);
        io.emit('messageResponse', message);
        // })
    });

    // io.emit('notification', 'Conectado al socket');

    socket.on('disconnect', () => {
        console.log('Un cliente se ha desconectado');
    });
});


app.use(express.static('public'))

app.get('/game', (req, res) => {
    res.redirect('game.html');
});

app.get('/message', (req, res) => {
    res.redirect('message.html');
});

app.get('/', (req, res) => {
    res.redirect('index.html');
})

server.listen(port, () => {
    console.log('El servidor está escuchando en el puerto 3000');
});