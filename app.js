const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const socket = require('socket.io');

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

// routing
const accounts = require('./routes/AccountsRouter');
const products = require('./routes/ProductsRouter');
const wallets = require('./routes/WalletsRouter');
const orders = require('./routes/OrdersRouter');
app.use('/api/accounts', accounts);
app.use('/api/products', products);
app.use('/api/wallets', wallets);
app.use('/api/orders', orders);

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
var io = socket(server);

io.on('connection', (socket) => {
    console.log('made socket connection', socket.id); 
    function OrderSuccess() {
        io.socket()
    }
});
