export class ListarCirurgiaViewModel {
    id: string;
    nomeCirurgia: string;
    data: string;
    horaInicio: string;
    horaTermino: string;

    constructor(nomeCirurgia: string, id: string, data: string, hi: string, ht: string) {
        this.id = id;
        this.data = data;
        this.horaInicio = hi;
        this.horaTermino = ht;
        this.nomeCirurgia = nomeCirurgia;
    }
}