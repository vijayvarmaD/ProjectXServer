const io = require('../app');
const socket = require('socket.io');

module.exports = {
    sendMsg: (msg) => {
        if(msg == "hi") {
            io.emit('comm', "hi");
        }
    }

}