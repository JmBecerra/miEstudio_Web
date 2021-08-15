export interface Tarifa {
    id          :number;
    numAct      :number;
    precio      :number;
    activa      :boolean;
    idPeriodo   :number;
      

}

export interface TarifaListado {
    id          :number;
    numAct      :number;
    precio      :number;
    activa      :boolean;
    periodo     :string;

}
