
const fs = require('fs');


class Ticket{


constructor(numero, escritorio){
this.numero = numero;
this.escritorio = escritorio;

}

}

//Esta clase se va a encargar de manejar el sistema de los tickets
class TicketSistema{



constructor(){

//En es6 se pueden declarar y inicializar variables desde el construtcor
    this.ultimo = 0;
    this.hoy = new Date().getDate();

    //De esta forma leemos un archivo json
    const data = require('../data/data.json');

    //De esta forma si se cae el sistema, sabemos si continuar creando
    //Ademas de saber si continuamos con la generacion de tickets del dia
    if(data.hoy === this.hoy ){

    //Esta propiedad guarda el numero de tickets generados en el dia    
    this.ultimo = data.ultimo;

    //Esta propiedad es un arreglo , que se encargara de guardar los tickets generados en el dia
    this.tickets = data.tickets; 

    //Esta propiedad se va a encargar de tratar los
    this.ultimos4 = data.ultimos4;

    }else{

    this.reiniciarConteo();

    }

}

getUltimoTicket(){

    return this.ultimo;
}

getUltimos4(){

return this.ultimos4;    
}

//De esta forma guadamos y creamos un ticket
siguiente(){

    this.ultimo++;

    this.tickets.push( new Ticket( this.ultimo, null) );

    this.guardarConteo();

    return `Ticket ${ this.ultimo }`
}

atenderTicket( escritorio ){

    if( this.tickets.length === 0) return 'No hay tickets';

    //ASi extramos el numero del ultimo ticked creado
    const numeroTicket = this.tickets[0].numero;

    //Lo borramos del arreglo del tickets por que ya sera tratado
    this.tickets.shift();

    const atenderTicket = new Ticket( numeroTicket, escritorio );

    this.ultimos4.unshift( atenderTicket );

    //Asi verificamos que solo sean 4
    if( this.ultimos4.length > 4){
        //De esta forma eliminamos el ultimo ticket
        this.ultimos4.pop();
    }

    console.log('Ultimos 4 ', this.ultimos4 );
    this.guardarConteo();

    return atenderTicket;


}

reiniciarConteo(){

    this.ultimo =0;
    this.tickets = [];
    this.ultimos4= [];

    this.guardarConteo();
    console.log('Se reinicio el sistema de tickets');
   
}

//Este motodo nos sirve para guardar en un archivo json el conteo de los tickets
//Se debe remplazar con una base de datos
guardarConteo(){

    const data={
        ultimo: this.ultimo,
        hoy: this.hoy,
        tickets: this.tickets,
        ultimos4: this.ultimos4
    }
 
    const jsonData = JSON.stringify( data );
 
 
 
    fs.writeFileSync('./server/data/data.json', jsonData);
 
    console.log('Se guardo el conteo');

}

}


module.exports = {
TicketSistema
};