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