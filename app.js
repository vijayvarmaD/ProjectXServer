const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');

// mongoose
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://mongodb:27017/APIAuthentication');

const app = express();
app.use(helmet());

// middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// routing
const accounts = require('./routes/AccountsRouter');
app.use('/api/accounts', accounts);

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
app.listen(port, () => console.log('Server is listening on port '+ port));