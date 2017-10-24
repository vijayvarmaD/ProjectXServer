const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const socket = require('socket.io');
const cors = require('cors');

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/ProjectXDB');

const app = express();

// Static Files
app.use(express.static('public'));

app.use(helmet());

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

<<<<<<< HEAD
=======
// cors
// var originsWhitelist = [
//     'http://localhost:4200'
// ];
// var corsOptions = {
//     origin: function(origin, callback){
//           var isWhitelisted = originsWhitelist.indexOf(origin) !== -1;
//           callback(null, isWhitelisted);
//     },
//     credentials:true
// }
>>>>>>> 55084033715c1a998b821eac66bd5dfe8703e055
app.use(cors());

// routing
const accounts = require('./routes/AccountsRouter');
const products = require('./routes/ProductsRouter');
const wallets = require('./routes/WalletsRouter');
const orders = require('./routes/OrdersRouter');
const views = require('./routes/ViewsRouter');
app.use('/api/accounts', accounts);
app.use('/api/products', products);
app.use('/api/wallets', wallets);
app.use('/api/orders', orders);
app.use('/api/views', views);

// Catch 404 Errors
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// Error handling
app.use((err, req, res, next) => {
    const error = app.get('env') === 'development' ? err: {};
    const status = err.status || 500;  
    // Respond to client
    res.status(status).json({
        error: {
            message: error.message
        }
    });

    // Respond to ourselves
    console.error(err);
});

// Start the server
const port = app.get('port') || 3000;
var server = app.listen(port, () => console.log('Server is listening on port '+ port));

// Socket Setup
<<<<<<< HEAD
const { sendMsg } = require('./services/sock');
var io = socket(server);
module.exports = io;
io.on('connection', (socket) => {
    console.log('made socket connection', socket.id); 
    // io.emit('something happened', "i m server");
    socket.on('chat message', function(msg){
        sendMsg(msg);
    });
});

=======
const socket = require('socket.io').listen(server);

// io.sockets.on('connection', (socket) => {
//     socket.on('join room', (data) => {
//        socket.join(data.room);
//        console.log('joined room' + data.room); 
//     });
//     socket.on('orderCompleted', (data) => {
        
//     });
// });
>>>>>>> 55084033715c1a998b821eac66bd5dfe8703e055

