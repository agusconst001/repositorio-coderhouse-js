// Variables
let baseDeDatos = [];
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
    return resultado;
}

// Función para cargar datos del JSON
function cargarDatos() {
    return new Promise((resolve, reject) => {
        fetch('baseDeDatos.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al cargar los datos');
                }
                return response.json();
            })
            .then(data => {
                baseDeDatos = data;
                const baseDeDatosAlmacenada = JSON.parse(localStorage.getItem('baseDeDatos'));
                if (baseDeDatosAlmacenada) {
                    baseDeDatos = baseDeDatos.concat(baseDeDatosAlmacenada);
                }
                resolve();
            })
            .catch(error => reject(error));
    });
}

// Función para guardar datos en localStorage
function guardarDatos() {
    return new Promise((resolve) => {
        localStorage.setItem('baseDeDatos', JSON.stringify(baseDeDatos));
        resolve();
    });
}

// Función para manejar el envío del formulario
async function manejarEnvioFormulario() {
    const registrado = document.getElementById('registrado').value;
    nombreUsuario = document.getElementById('nombreUsuario').value;
    nombre = document.getElementById('nombre').value;
    apellido = document.getElementById('apellido').value;
    edad = parseInt(document.getElementById('edad').value);
    dni = parseInt(document.getElementById('dni').value);
    credito = parseFloat(document.getElementById('credito').value);
    cantidadCuotas = parseInt(document.getElementById('cuotas').value);
    tasaInteres = parseFloat(document.getElementById('interes').value);

    try {
        if (registrado === 'si') {
            const usuario = usuarioExiste(nombreUsuario, nombre, apellido);
            if (usuario) {
                const resultado = calcularPlanDePago(credito, cantidadCuotas, tasaInteres);
                Swal.fire({
                    title: 'Plan de Pago Calculado',
                    html: resultado,
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Los datos no existen en la base de datos.',
                    icon: 'error'
                });
            }
        } else {
            if (!isNaN(edad) && !isNaN(dni) && edad >= 18) {
                let nuevoUsuario = new Usuario(nombreUsuario, nombre, apellido, edad, dni);
                baseDeDatos.push(nuevoUsuario);
                await guardarDatos();
                const resultado = calcularPlanDePago(credito, cantidadCuotas, tasaInteres);
                Swal.fire({
                    title: 'Usuario Registrado y Plan de Pago Calculado',
                    html: resultado,
                    icon: 'success'
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Edad o DNI inválidos.',
                    icon: 'error'
                });
            }
        }
    } catch (error) {
        Swal.fire({
            title: 'Error',
            text: 'Hubo un problema con el procesamiento de los datos.',
            icon: 'error'
        });
    }
}

// Eventos
document.getElementById('enviar').addEventListener('click', manejarEnvioFormulario);

// Cargar datos del JSON y localStorage al cargar la página
window.onload = () => {
    cargarDatos()
        .then(() => {
            console.log('Datos cargados exitosamente.');
        })
        .catch(error => {
            console.error('Error al cargar los datos:', error);
        });
};