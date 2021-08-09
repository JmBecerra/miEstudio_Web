

export interface Cliente {
    id:               number;
    nombre:           string;
    apellido1:        string;
    apellido2:        string;
    dni:              string;
    telefono:         string;
    email:            string;
    fecha_nac:        Date;
    alta:             boolean;
    fecha_alta:       Date;
    fecha_mod:        Date;
    contraseña:       string;
    tipo_usuario:     number;
}

export interface ClienteListado {
    id:               number;
    nombre:           string;
    apellidos:        string;
    telefono:         string;
    email:            string;
}
