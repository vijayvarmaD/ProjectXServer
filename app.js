const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const socket = require('socket.io');
const cors = require('cors');
const passport = require('passport');
const socketioJwt = require('socketio-jwt');
const { JWT_SECRET } = require('./configuration/index');
const jwt_decode = require('jwt-decode');

const Customer = require('./models/CustomerSchema');
const Vendor = require('./models/VendorSchema');
const DeliveryPerson = require('./models/DeliveryPersonSchema');
// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://express:express@ds163053.mlab.com:63053/eatupdb');

const app = express();
module.exports = app;

// Static Files
app.use(express.static('public'));

app.use(helmet());

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

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
const port = process.env.PORT || '3000';
app.set('port', port);
var server = app.listen(port, () => console.log('Server is listening on port '+ port));

// SocketIO Initialization
global.io = socket(server);

// JWT Auth
io.set('authorization', socketioJwt.authorize({
    secret: JWT_SECRET,
    handshake: true
}));

// Global Connected users Array
global.users = [];

// First entry
io.on('connection', async (socket) => {
    const decoded = jwt_decode(socket.handshake.query.token);
    const customer = await Customer.findById(decoded.sub, { "_id": 1 });
    const vendor = await Vendor.findById(decoded.sub, { "_id": 1 });
    if (customer === null) {
        users.push({ socketId: socket.id, userId: vendor._id });
    } 
    if (vendor === null) {
        users.push({ socketId: socket.id, userId: customer._id });
    }
    io.on('disconnect', () => {
        console.log('user disconnected');
    });
});

