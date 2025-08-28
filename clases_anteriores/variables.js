//Variables
//var (Evitar usarla) ❌
//Scope -> a nivel de funcion
console.log(name);

var name = "Adrian";
var age = 17;

console.log(name);


function james() {
    var age = 15;
    console.log(age);

}
//Permite re declarar la variable
var age = 19;
james();
console.log(age);

//age: No existe
//Hoisting

//let ✅
//console.log(sexo); //Error

let sexo = "Masculino";
//Scope : Bloque { ...AQUI... }
function mostrarGenero() {
    console.log(sexo);
    let gender = sexo;
    const OTRA = "Otra";
}
//No permite redefinir
//let sexo = "Otro";
sexo = "Uno Nuevo";
console.log(sexo);

mostrarGenero();
//console.log(gender);

//const 🗿
const ROL_USUARIO = "user";
const OTRA = "Otro valor";
// ROL_USUARIO = "Otro"; //Error

//Nomenclatura y Convenciones
let camelCase = 1;
let nombreUsuario = "Adrian";
let rolUsuarioPlataforma = "trainer";

let snake_case = 1;
let nombre_usuario = "Adrian";
let rol_usuario_plataforma = "trainer";

const SCREAMING_CASE = 1;
const NOMBRE_USUARIO = "Adrian";
const ROL_USUARIO_PLATAFORMA = "trainer";

//Tipos de datos primitivos
//number
let numero = 0 / 0;
console.log(typeof numero);

//string
let texto = "a1" + 1;
console.log(typeof texto);

//boolean
let esMayorQueYo = false;
console.log(typeof esMayorQueYo);
//null
let tarjetasDeCredito = null;
console.log(typeof tarjetasDeCredito);

//undefined
let elNoCaermeDeLaMoto;
console.log(elNoCaermeDeLaMoto);

//Tipos de datos complejos o de referencia
//Object

//JSON >
let informacion = {
    nombre: "Estebanquito",
    edad: 19,
    caidas: 1,
    perros: [
        {
            nombre: "Nino",
            genero: "Macho"
        }
    ],
    mordidas: true
};
console.log(typeof informacion);

//Arrays
let caidas = [
    {
        fecha: '2025-08-10',
        damages: 'mental'
    },
    {
        vehiculo: 'motocicleta'
    },
    true,
    'otros valores',
    [1, 2, 3, 4, 5, 6, 7, 8, 9]
];

console.log(typeof caidas);


//Conversiones

//ToString
let esMayor = true;
let edadDeMayor = 18;
console.log(typeof esMayor);
console.log(typeof edadDeMayor);

esMayor = String(esMayor);
console.log(typeof esMayor);
edadDeMayor = String(edadDeMayor);
console.log(typeof edadDeMayor);

let baloto = "234567890";
console.log(typeof baloto);
baloto = Number( "234567890");
console.log(typeof baloto);

// Interpolacion de variables
let mensaje = 'Hola, mi nombre es \' "' +nombreUsuario+ '" y yo gane con el baloto N ' + baloto + '. \n \nMi edad es '+ edadDeMayor;

let mensajeChido = `Hola, mi nombre es ${nombreUsuario} y yo gane con el baloto N ${baloto}. 


Mi edad es ${edadDeMayor}`;
console.log(mensaje);
console.log(mensajeChido);
