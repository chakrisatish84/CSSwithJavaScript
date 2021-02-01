"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var io = require('socket.io')(5000);
io.on('connection', function (socket) {
    debugger;
    var id = socket.handshake.query.id;
    socket.join(id);
    socket.on('sen-message', function (sendMessage) {
        var recepients = sendMessage.recepients;
        var message = sendMessage.message;
        recepients.forEach(function (recepient) {
            var newRecepients = recepients.filter(function (r) { return r != recepient; });
            newRecepients.push(id);
            socket.broadcast.to(recepient).emit('receive-message', {
                sendMessageModel: { recepients: newRecepients, message: message }, sender: id
            });
        });
    });
});
