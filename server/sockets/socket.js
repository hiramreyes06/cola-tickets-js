const { io } = require('../server');


const { TicketSistema } = require('../classes/ticket');


const ticket = new TicketSistema();

//Esta funcion sirve estar al pendiente de las conecciones de los usuarios a sockets
io.on('connection', (client) => {

//Cuando el servidor esuche este evento emitido ejecutara y retornara un callback 
// con argumentos el cual sera retornado al cliente 
client.on('siguiente-ticket', (data, callback) =>{


let siguiente = ticket.siguiente();
console.log('Evento recibido '+siguiente);

callback(siguiente);

});

client.on('atender-ticket',(data, callback) =>{

if(!data.escritorio){
return callback({
    err: true,
    mensaje:'El escritorio es necesario'
})
}

//Asi le asigamos un escritorio a un ticket del arreglo, lo borramos del 
//areglo y lo pasamos al arreglo de ultimos 4
const atenderTicket = ticket.atenderTicket( data.escritorio );

callback( atenderTicket );

//Esto le va a avisar al la pantalla public que actualice el html
client.broadcast.emit('utlimos4', ticket.getUltimos4() );

});

client.emit('estado-actual', {
   numero : ticket.getUltimoTicket(),
   ultimos4: ticket.getUltimos4()
 });



});