export interface Metodo {
    id:           number;
    fechaAct:     Date;
    fechaCobro:   Date;
    pagado:       boolean;
    metodo:       number;
    idUsuario:    number;
    idTarifa:     number;

}

export interface MetodoListado {
    fechaAct: string;
    fechaCobro: string;
    tarifa: string;
    precio: string;
    pagado: boolean;
    

}
