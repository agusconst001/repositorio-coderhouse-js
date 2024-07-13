// variables _________________________________________________________
let user_name = prompt("Ingrese su nombre de usurio: ");
let edad = parseInt(prompt("Ingrese su edad: "));
let dni = prompt("Ingrese su DNI: ");
let credito = parseInt(prompt("Ingrese cuanto dinero desea retirar: "));
const CANT_CUOTAS = parseInt(prompt("Ingrese la cantidad de cuotas a cuotas: "));
const INTERES = 8;

// programa______________________________________________________________
if (edad >= 18 && credito >= 1000000) {
    let calculoTotalInteres = 0; //----------------------------------acumula los intereses calculados
    for (let i = 1; i <= CANT_CUOTAS; i++) {
        let cuotaSinInteres = credito / CANT_CUOTAS;
        let interesCuota = (credito * INTERES / 100); //-------------se calcula el interes de cada mes
        let cuotaConInteres = cuotaSinInteres + interesCuota;//------cuánto pagará el usuario en cada cuota
        calculoTotalInteres += interesCuota; //contiene la suma de todos los intereses pagados + las cuotas
        console.log(`En la cuota ${i} usted habrá pagado ${cuotaConInteres}`);
    }
    console.log(`En total usted habrá pagado ${credito + calculoTotalInteres}`); //imprime el monto total
} else {
    console.log(`Usuario ${user_name} (dni: ${dni}) usted no puede acceder al crédito`);
}