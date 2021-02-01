import { Socket } from 'dgram';
import { ContactModel } from '../client/whats-app-clone/src/Contexts/ContactsProivder';
import { SendMessageModel } from '../client/whats-app-clone/src/Contexts/ConversationsProivder';
const io = require('socket.io')(5000)


io.on('connection', (socket:any) => {
    debugger;
    const id = socket.handshake.query.id;
    socket.join(id);
    socket.on('sen-message', (sendMessage: SendMessageModel) => {
        const recepients = sendMessage.recepients;
        const message = sendMessage.message;
        recepients.forEach((recepient: ContactModel) => {
            const newRecepients = recepients.filter((r: ContactModel) => r != recepient);
            newRecepients.push(id)
            socket.broadcast.to(recepient).emit('receive-message', {
                sendMessageModel: { recepients: newRecepients, message: message }, sender: id
            })
        })

    })

})