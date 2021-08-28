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
    idActUser: number;
    idActividad:number;
    tipo: string;
    nivel: string;
    dia: string;
    horario: string;
    ocupacion: number;

}
