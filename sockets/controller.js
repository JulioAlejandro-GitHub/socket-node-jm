

const socketController = (socket) => {
    /*
    socket.id es muy cambiante, solo uso de io
    usar jwt
    */
    //console.log('cliente conectado', socket.id);

    socket.on('disconnect', () => {
        //console.log('cliente desconectado', socket.id);
    });

    // metodo personalizado con callback, cuando cliente emite 'enviar-mensaje'
    socket.on('enviar-mensaje', (payload, callback) => {
        // emitor a todos los clientes conectados

        // servidor de socket envia :: broadcast todos menos el q envia
        socket.broadcast.emit('enviar-mensaje', payload);

        callback(payload.id);
    });
}

module.exports = {
    socketController
}