

export interface Cliente {
    idUsuario:       number;
    nombre:           string;
    apellido1:        string;
    apellido2?:        string;
    dni?:              string;
    telefono:         string;
    email:            string;
    fechaNac:        Date;
    alta:             number;
    fechaAlta:       Date;
    fechaMod:        Date;
    password:       string;
    tipoUsuario:     number;
}

export interface ClienteListado {
    id:               number;
    nombre:           string;
    apellidos:        string;
    telefono:         string;
    email:            string;
}
