// Un comentario de una sola Linea
let saludo = 'Hola camper, ';
let nombre = 'Adrian Ruiz';
/**
 * Un Comentario
 * De
 * Multiples
 * Lineas
 */
// TODO: Hacer un cambio
// FIXME: Arreglar despues
console.log(saludo, nombre);

//Funcion para sumar un numero ❌

/**
 * Suma de dos numeros a y b ✅
 * @param {number} a El primer numero para la adicion
 * @param {number} b El segundo numero para la adicion
 * @returns {number} La suma de a y b.
 */
function sumar(a,b) {
    return a + b;
}

//Llamar a la funcion sumar
console.log(sumar(1, 10)); console.log(sumar(12, 7));

function mostrar(any) {
    console.log(any);
}

//Operadores Matemáticos
mostrar(5+5);
mostrar(5-3);
mostrar(5*3);
mostrar(5/3);
mostrar(5%3);
mostrar(5**2);
let number = 5;
// Incremento o Decrementos
// -- o ++ number -> Inmediata
// number -- o ++ -> Posterior
mostrar(++number);//6
mostrar(" Resultado de number despues de ++: " + number);
mostrar(number--);//5
mostrar(number);
mostrar(number+=2);
mostrar(number-=2);
mostrar(number*=2);
mostrar(number/=5);
mostrar(number%=2);
mostrar(number/0);

//Operadores de Igualdad
mostrar("Igualdad: " + (5 == '5'));
mostrar("Estrictamente Igual: " + (5 === '5'));
mostrar("Desigualdad: " + (5 != '5'));
mostrar("Desigualdad estricta: " + (5 !== '5'));
mostrar("Mayor: " + (5 > '4'));
mostrar("Mayor igual: " + (5 >= '4'));
mostrar("Menor: " + (5 < '4'));
mostrar("Menor igual: " + (5 <= '4'));
mostrar("Concantenar: " + (5 + '4'));
let a, b, c ;
a = b = c = 1 + 20;
mostrar(a);
mostrar(b);
mostrar(c);
//Operadores Lógicos
mostrar("Operador Y lógico(AND): " + (5 == 5 && true));
mostrar("Operador Y lógico(AND): " + (5 != 5 && true));

mostrar("Operador O lógico(OR): " + (5 >= 5 || 2 < 6));
mostrar("Operador O lógico(OR): " + (5 > 5 || 2 > 6));

mostrar("Operador NO lógico(NOT): " + !(5 >= 5));
mostrar("Operador NO lógico(NOT): " + !(5 > 5));
