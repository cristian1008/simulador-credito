//AQUI TODA LA LOGICA DE LAS FUNCIONES DEL NEGOCIO


function calcularDisponible(ingresos, egresos){
    let valor=ingresos-egresos;
    if(valor>=0){
        return valor;
    }else{
        return 0;
    }
}

function calcularCapacidadPago(montoDisponible){
    let capacidadPago=montoDisponible*0.5;
    return capacidadPago;
}

function calcularInteresSimple(monto, tasa, plazoAnios){

    let valorInteres=monto*plazoAnios*(tasa/100);
    return valorInteres;

}

function calcularTotalPagar(monto, interes){

    let totalPagar=monto+interes+100;
    return totalPagar;

}

function calcularCuotaMensual(total, plazoAnios){
    let plazoMeses=plazoAnios*12;
    let cuotaMensual=total/plazoMeses;
    return cuotaMensual;
}

function aprobarCredito(capacidadPago, cuotaMensual){
    if(capacidadPago>cuotaMensual){
        return true;
    }else{
        return false;
    }
}