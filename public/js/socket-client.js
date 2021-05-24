
// referencias html
const lblOnline = document.querySelector('#lblOnline');
const lblOffline = document.querySelector('#lblOffline');
const txtMensaje = document.querySelector('#txtMensaje');
const btnEnviar = document.querySelector('#btnEnviar');

// cliente !!!! documento publico
//cuando se modifica este archivo hay que actualizar el navegador
const socket = io();

socket.on('connect', () => {
    lblOnline.style.display = 'block';
    lblOffline.style.display = 'none';
});
socket.on('disconnect', () => {
    lblOnline.style.display = 'none';
    lblOffline.style.display = 'block';
});

//escucha, recive mensaje del servidor 
socket.on('enviar-mensaje', (payload) => {
    console.log(payload);
});

btnEnviar.addEventListener('click', () => {
    const mensaje = txtMensaje.value;
    const payload = {
        mensaje,
        id:'un id',
        fecha : new Date().getTime()
    }

    //envia mensaje al servidor
    socket.emit('enviar-mensaje', payload, (id) => {
        console.log('callback desde server :: ', id);
    });
});