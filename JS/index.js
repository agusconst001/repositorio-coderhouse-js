const baseDeDatos = [
    { nombreUsuario: '1', nombre: '1', apellido: '1', edad: 1, dni: 1 },
    { nombreUsuario: 'Anailia95', nombre: 'Analia', apellido: 'Manzana', edad: 33, dni: 5555555 },
    { nombreUsuario: 'EdgarAP09', nombre: 'Edgar Allan', apellido: 'Poe', edad: 40, dni: 666666666 },
    { nombreUsuario: 'Beetho', nombre: 'Ludwig van', apellido: 'Beethoven', edad: 56, dni: 99999999999 },
    { nombreUsuario: 'MarxK', nombre: 'Karl', apellido: 'Marx', edad: 64, dni: 8888888 },
    { nombreUsuario: 'theMaieCurie', nombre: 'Marie', apellido: 'Curie', edad: 66, dni: 444444444 }
];

// Variables
let nombreUsuario, nombre, apellido, edad, dni, credito, cantidadCuotas, tasaInteres;

// Funciones
// Función constructora
function Usuario(nombreUsuario, nombre, apellido, edad, dni) {
    this.nombreUsuario = nombreUsuario;
    this.nombre = nombre;
    this.apellido = apellido;
    this.edad = edad;
    this.dni = dni;
}

// Función para verificar si un usuario existe en la base de datos
function usuarioExiste(nombreUsuario, nombre, apellido) {
    return baseDeDatos.find(user => user.nombreUsuario === nombreUsuario && user.nombre === nombre && user.apellido === apellido);
}

// Función para calcular el plan de pago
function calcularPlanDePago(credito, cantidadCuotas, tasaInteres) {
    let calculoTotalInteres = 0;
    let resultado = '';
    for (let i = 1; i <= cantidadCuotas; i++) {
        let cuotaSinInteres = credito / cantidadCuotas;
        let interesCuota = (credito * tasaInteres / 100) / 12; // Interés mensual
        let cuotaConInteres = cuotaSinInteres + interesCuota;
        calculoTotalInteres += interesCuota;
        resultado += `En la cuota ${i} usted habrá pagado ${cuotaConInteres.toFixed(2)}<br>`;
    }
    resultado += `En total usted habrá pagado ${(credito + calculoTotalInteres).toFixed(2)}`;
    document.getElementById('resultado').innerHTML = resultado;
}

// Eventos
document.getElementById('enviar').addEventListener('click', function() {
    const registrado = document.getElementById('registrado').value;
    nombreUsuario = document.getElementById('nombreUsuario').value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    edad = parseInt(document.getElementById('edad').value);
    dni = parseInt(document.getElementById('dni').value);
    credito = parseFloat(document.getElementById('credito').value);
    cantidadCuotas = parseInt(document.getElementById('cuotas').value);
    tasaInteres = parseFloat(document.getElementById('interes').value);

    if (registrado === 'si') {
        if (usuarioExiste(nombreUsuario, nombre, apellido)) {
            calcularPlanDePago(credito, cantidadCuotas, tasaInteres);
        } else {
            alert('Los datos no existen en la base de datos.');
        }
    } else {
        if (!isNaN(edad) && !isNaN(dni) && edad >= 18) {
            let nuevoUsuario = new Usuario(nombreUsuario, nombre, apellido, edad, dni);
            baseDeDatos.push(nuevoUsuario);
            localStorage.setItem('baseDeDatos', JSON.stringify(baseDeDatos));
            calcularPlanDePago(credito, cantidadCuotas, tasaInteres);
        } else {
            alert('Edad o DNI inválidos.');
        }
    }
});

// Cargar datos del localStorage si existen
window.onload = function() {
    if (localStorage.getItem('baseDeDatos')) {
        const baseDeDatosAlmacenada = JSON.parse(localStorage.getItem('baseDeDatos'));
        baseDeDatosAlmacenada.forEach(user => baseDeDatos.push(user));
    }
};