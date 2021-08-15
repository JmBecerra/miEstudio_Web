export interface Actividad {
    id:               number;
    dia:              string;
    horario:          string;
    ocupacion:        number;
    activa:           boolean;
    idTipo:           number;
    idnivel:          number;
}

export interface ActividadListado {
    tipo: string;
    nivel: string;
    dia: string;
    hora: string;
    ocupacion: number;

}
