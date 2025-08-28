"use strict";

let cilindraje = 100;
let valor = 0;

if (cilindraje < 100) { 
    valor = 200000; 
}
else if (cilindraje <= 200) { 
    valor = 350000; 
}
else {
    valor = 789000;
}

switch (valor) {
    case 200000:
        console.log(`El vehiculo tiene un SOAT economico de: ${valor}`); 
        break;
    case 450000:
    case 350000:
        console.log(`El vehiculo tiene un SOAT de: ${valor}`);
        break;
    default:
        console.log(`El vehiculo tiene un SOAT COMPLETO economico de: ${valor}`);
        break;
}

switch (true) {
    case (valor <= 200000):
        console.log(`El vehiculo tiene un SOAT economico de: ${valor}`); 
        break;
    case (valor > 200000 || (valor <= 350000)):
        console.log(`El vehiculo tiene un SOAT de: ${valor}`);
        break;
    default:
        console.log(`El vehiculo tiene un SOAT COMPLETO economico de: ${valor}`);
        break;
}

//for
for (let i =0 ; i < 10 ; i++) {
    console.log(`Iteraccion N: ${i}`);
}

//while
let i = 0;
while (5 == 5) {
    console.log(`Iteraccion N: ${i}`);
    if(i < 10) {
        i++;
    } else {
        break;
    }
}

//do while
let a = 0;
do {
    console.log(`Iteraccion N: ${a}`);
    if(a < 10) {
        a++;
    } else {
        break;
    }
} while (5 == 5);

let marcas = ['Sushi Guayaba', 'Mike', 'Niguala', 'Daniels', 'Ardidas', 'Arturo Anden'];

for(let marca of marcas) {
    console.log(typeof marca);
    console.log(marca);
}

let camper = { nombre: "Muriel", edad: 20 }

for(let clave in camper) {
    console.log(clave);
    console.log(camper[clave]);
}

console.clear();

for(let marca of marcas) {

    if(marca == "Niguala") {
        //continue;
        break;
    }

    console.log(`La marca es: ${marca}`);
}

console.clear();

try {
    let resultado = new Array(-1);    
    console.log(resultado);
} catch(error) {
    console.log(`❌ Se produjo un error en: ${error}`);
} finally {
    console.log('Siempre me ejecuto!');
    
}

console.log('Continuacion del flujo de la aplicacion');



