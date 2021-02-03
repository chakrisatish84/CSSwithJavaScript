"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendMessageModel = exports.ContactModel = void 0;
var io = require('socket.io')(5000);
var ContactModel = /** @class */ (function () {
    function ContactModel() {
    }
    return ContactModel;
}());
exports.ContactModel = ContactModel;
var SendMessageModel = /** @class */ (function () {
    function SendMessageModel() {
    }
    return SendMessageModel;
}());
exports.SendMessageModel = SendMessageModel;
io.on('connection', function (socket) {
    debugger;
    var id = socket.handshake.query.id;
    socket.join(id);
    socket.on('send-message', function (sendMessage) {
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
