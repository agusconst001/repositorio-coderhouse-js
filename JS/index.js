const database = [
    {
        username: '1', nombre: '1', apellido: '1', edad: 1,dni: 1,
    },
    {
        username: 'Anailia95', nombre: 'Analia', apellido: 'Manzana', edad: 33,dni: 5555555,
    },
    {
        username: 'EdgarAP09', nombre: 'Edgar Allan', apellido: 'Poe', edad: 40, dni: 666666666,  
    },
    {
        username: 'Beetho', nombre: 'Ludwig van', apellido: 'Beethoven', edad: 56, dni: 99999999999,  
    },
    {
        username: 'MarxK', nombre: 'Karl', apellido: 'Marx', edad: 64, dni: 8888888,
    },
    {
        username: 'theMaieCurie', nombre: 'Marie', apellido: 'Curie', edad: 66, dni: 444444444,
    }
]

// Variables
let userName;
let nombreUser;
let apellidoUser;
let edadUser;
let dniUser;
let credito;
let cantCuotas;
let interes;

// Funciones
// Función constructora
function Usuario(username, nombre, apellido, edad, dni) {
    this.username = username;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
}

// Función para verificar si un usuario existe en la base de datos
function usuarioExiste(username, nombre, apellido) {
    return database.find(user => user.username === username && user.nombre === nombre && user.apellido === apellido);
}

// Función para calcular el plan de pago
function calcularPlanDePago(credito, cantCuotas, interes) {
    let calculoTotalInteres = 0;
    for (let i = 1; i <= cantCuotas; i++) {
        let cuotaSinInteres = credito / cantCuotas;
        let interesCuota = (credito * interes / 100) / 12; // Interés mensual
        let cuotaConInteres = cuotaSinInteres + interesCuota;
        calculoTotalInteres += interesCuota;
        console.log(`En la cuota ${i} usted habrá pagado ${cuotaConInteres.toFixed(2)}`);
    }
    console.log(`En total usted habrá pagado ${(credito + calculoTotalInteres).toFixed(2)}`);
}


//programa
let siOrNo = prompt("Bienvenido a Financiera KIKI, ¿usted está registrado? si/no").toLowerCase();

while (!(siOrNo === "si" || siOrNo === "no")) {
    siOrNo = prompt("Por favor, responda con 'si' o 'no'. ¿Usted está registrado? si/no").toLowerCase();
}

if (siOrNo === "si"){
    userName = prompt("Ingrese su nombre de usuario: ");
    nombreUser = prompt("Ingrese su nombre: ");
    apellidoUser = prompt("Ingrese su apellido: ");
    edadUser = parseInt(prompt("Ingrese su edad: "));
    if (usuarioExiste(userName, nombreUser, apellidoUser)) {
        // Solicitar detalles del crédito
        credito = parseFloat(prompt("¿Cuánto crédito desea solicitar?"));
        cantCuotas = parseInt(prompt("¿En cuántas cuotas desea pagarlo?"));
        interes = parseFloat(prompt("Ingrese la tasa de interés anual: "));
        // Calcular el plan de pago
        calcularPlanDePago(credito, cantCuotas, interes);
    } else {
        alert("Los datos no existen en la base de datos.");
    }
} else if (siOrNo === "no") {
    userName = prompt("Ingrese su nombre de usuario: ");
    nombreUser = prompt("Ingrese su nombre: ");
    apellidoUser = prompt("Ingrese su apellido: ");
    edadUser = parseInt(prompt("Ingrese su edad: "));
    dniUser = parseInt(prompt("Ingrese su dni: "));
    if (!isNaN(edadUser) && !isNaN(dniUser) && edadUser >= 18) {
        let nuevoUsuario = new Usuario(userName, nombreUser, apellidoUser, edadUser, dniUser);
        database.push(nuevoUsuario);
        // Solicitar detalles del crédito
        credito = parseFloat(prompt("¿Cuánto crédito desea solicitar?"));
        cantCuotas = parseInt(prompt("¿En cuántas cuotas desea pagarlo?"));
        interes = parseFloat(prompt("Ingrese la tasa de interés anual: "));
        // Calcular el plan de pago
        calcularPlanDePago(credito, cantCuotas, interes);
    } else {
        alert("Edad o DNI inválidos.");
    }
}