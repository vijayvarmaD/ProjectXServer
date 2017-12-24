const io = require('../app');
// const usersPool = require('../app');
const socket = require('socket.io');

module.exports = {
    sendMsg: (msg) => {
        if(msg == "hi") {
            io.emit('comm', "hi");
        }
        if(msg == "order recieved") {
            console.log('here');
            // console.log(usersPool);
            io.emit('order', msg);
        }
    }
}