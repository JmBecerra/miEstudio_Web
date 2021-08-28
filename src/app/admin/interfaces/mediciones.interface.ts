export interface Medicion {
    idMedicion: number;
    peso:       number;
    altura:     number;
    grasa:      number;
    musculo:    number;
    agua:       number;
    abdomen:    number;
    cintura:    number;

}

export interface MedicionListado {
    idMedicionUsaurio   :number
    idMedicion          :number;
    fecha               :string;
    peso                :number;
    altura              :number;
    grasa               :number;
    musculo             :number;
    agua                :number;
    abdomen             :number;
    cintura             :number;
    

}
