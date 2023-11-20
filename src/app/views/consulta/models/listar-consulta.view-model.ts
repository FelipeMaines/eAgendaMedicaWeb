export class ListarConsultaViewModel {
    id: string;
    data: string;
    horaInicio: string;
    horaTermino: string;

    constructor(id: string, data: string, hi: string, ht: string)
    {
        this.id = id;
        this.data = data;
        this.horaInicio = hi;
        this.horaTermino = ht;
    }
}