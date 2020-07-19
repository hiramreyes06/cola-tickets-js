//Comando para establecer la conexion con el servidor con socket

var socket = io();

//De esta forma hacemos referencia a un elemento html con jquery
var label = $('#lblNuevoTicket');



socket.on('connect', function(){


console.log('Conectado al servidor');

socket.on('estado-actual', ultimoTicket=>{

label.text('El ultimo ticket: '+ ultimoTicket.numero);


});


});

socket.on('disconnect', function(){

    console.log('Desconectado del servidor');
    
});

//De esta form acon jquery escuchamos el click de todos los botones en el html
$('button').on('click', function(){

console.log('Se presiono el botnon');

//Al emitir este evento va a recibir los argumentos que tenga el callback
socket.emit('siguiente-ticket',null, function(siguiente){

label.text(siguiente);
});

});