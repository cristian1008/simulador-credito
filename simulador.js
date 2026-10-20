//AQUI EL JAVASCRIPT PARA MANIPULAR EL HTML


function calcular(){

    let ingresos=recuperarFloat("txtIngresos");
    let egresos=recuperarFloat("txtEgresos");

    let montoDisponible=calcularDisponible(ingresos, egresos);
    mostrarEnSpan("spnDisponible", "USD "+montoDisponible.toFixed(2));

//--------------------------------------------------------------------------
    let capacidadPago=calcularCapacidadPago(montoDisponible);
    mostrarEnSpan("spnCapacidadPago", "USD "+capacidadPago.toFixed(2));

//------------------------------------------------------------------------------------

    let monto=recuperarEntero("txtMonto");
    let plazoAnios=recuperarEntero("txtPlazo");
    let tasaInteres=recuperarEntero("txtTasaInteres");


    let interesValor=calcularInteresSimple(monto, tasaInteres, plazoAnios);
    mostrarEnSpan("spnInteresPagar", interesValor.toFixed(2));

//---------------------------------------------------------------------------

    let totalPagar=calcularTotalPagar(monto, interesValor);
    mostrarEnSpan("spnTotalPrestamo", totalPagar);

//-------------------------------------------------------------------------------

    let cuotaMensual=calcularCuotaMensual(totalPagar, plazoAnios);
    mostrarEnSpan("spnCuotaMensual", cuotaMensual.toFixed(2));


    let resultadoCredito=aprobarCredito(capacidadPago, cuotaMensual);
    let mensajeResultado;

    if(resultadoCredito){
        mensajeResultado="CREDITO APROBADO";
    }else{
        mensajeResultado="CREDITO RECHAZADO";
    }

    mostrarEnSpan("spnEstadoCredito", mensajeResultado);

}

// Configuración de los campos y sus mensajes de error
const camposValidacion = [
    { id: "txtIngresos", errorId: "errorIngresos", decimal: true },
    { id: "txtEgresos", errorId: "errorEgresos", decimal: true },
    { id: "txtMonto", errorId: "errorMonto", decimal: false },
    { id: "txtPlazo", errorId: "errorPlazo", decimal: false },
    { id: "txtTasaInteres", errorId: "errorTasaInteres", decimal: false }
];

// Validar los campos
function validarInput(id, errorId, decimal = false) {
    const input = document.getElementById(id);
    const mensaje = document.getElementById(errorId);
    const valor = input.value.trim();

    let error = "";

    if (valor === "") {
        error = "Este campo no puede estar vacío.";
    } else if (decimal) {
        // Hasta 5 enteros y hasta 2 decimales
        const formatoDecimal = /^\d{1,5}(\.\d{1,2})?$/;

        if (!formatoDecimal.test(valor)) {
            error = "Ingresa hasta 5 dígitos enteros y máximo 2 decimales.";
        }
    } else {
        // Los demás campos aceptan solo enteros de hasta 5 dígitos
        if (!/^\d{1,5}$/.test(valor)) {
            error = "Ingresa solo números enteros, máximo 5 dígitos.";
        }
    }

    mensaje.textContent = error;
    input.classList.toggle("input-error", error !== "");
    input.setAttribute("aria-invalid", error ? "true" : "false");

    return error === "";
}

// Eventos para cada campo
camposValidacion.forEach(({ id, errorId, decimal }) => {
    const input = document.getElementById(id);

    // Validar cuando el usuario sale del campo
    input.addEventListener("blur", () => {
        validarInput(id, errorId, decimal);
    });

    // Actualizar el mensaje mientras escribe
    input.addEventListener("input", () => {
        if (input.value.trim() !== "") {
            validarInput(id, errorId, decimal);
        } else {
            document.getElementById(errorId).textContent = "";
            input.classList.remove("input-error");
            input.setAttribute("aria-invalid", "false");
        }
    });
});