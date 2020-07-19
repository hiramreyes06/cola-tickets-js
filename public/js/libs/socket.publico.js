
const socket = io();

const lblTicket1= $('#lblTicket1');
const lblTicket2= $('#lblTicket2');
const lblTicket3= $('#lblTicket3');
const lblTicket4= $('#lblTicket4');

const lblEscritorio1 = $('#lblEscritorio1');
const lblEscritorio2 = $('#lblEscritorio2');
const lblEscritorio3 = $('#lblEscritorio3');
const lblEscritorio4 = $('#lblEscritorio4');

let lblTickets=[
    lblTicket1,
    lblTicket2,
    lblTicket3,
    lblTicket4
];
let lblEscritorios=[
    lblEscritorio1,
    lblEscritorio2,
    lblEscritorio3,
    lblEscritorio4
];

socket.on('estado-actual', data =>{

console.log(data);
actualizaHtml(data.ultimos4);

});


socket.on('utlimos4', ultimos4=>{

new Audio('audio/new-ticket.mp3').play(); 

actualizaHtml( ultimos4 );

});

function actualizaHtml( ultimos4 ){

for(let a=0; a<ultimos4.length ; a++){

lblTickets[a].text('Ticket '+ ultimos4[a].numero );
lblEscritorios[a].text('Escritorio '+ ultimos4[a].escritorio );

}

}