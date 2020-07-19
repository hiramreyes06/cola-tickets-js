
const socket = io();

const searchParams = new URLSearchParams( window.location.search );

if( !searchParams.has('escritorio')){
window.location = 'index.html';
throw new Error('El escritorio es necesario');
}

const escritorio = searchParams.get('escritorio');
const label= $('small');

$('h1').text('Escritorio '+ escritorio );

$('button').on('click', function(){

socket.emit('atender-ticket',{ escritorio: escritorio }, resp =>{

console.log(resp);

if(resp === 'No hay tickets'){

    alert(resp);
    label.text(resp);

    return;
}

label.text(resp.numero);

});
    
});


