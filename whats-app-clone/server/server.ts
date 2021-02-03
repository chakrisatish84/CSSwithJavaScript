const io = require('socket.io')(5000)


export class ContactModel {
    id!: string;
    name!: string;
}

export class SendMessageModel {
    recepients!: ContactModel[];
    message!: string;
}

io.on('connection', (socket: any) => {
    debugger;
    const id = socket.handshake.query.id;
    socket.join(id);
    socket.on('send-message', (sendMessage: SendMessageModel) => {
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