export interface Pago {
    idPago:       number;
    fechaAct:     Date;
    fechaCobro:   Date;
    pagado:       boolean;
    metodo:       number;
    idUsuario:    number;
    idTarifa:     number;

}

export interface PagoListado {
    fechaAct: string;
    fechaCobro: string;
    tarifa: string;
    precio: string;
    pagado: boolean;
    

}
