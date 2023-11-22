export class ListarCirurgiaViewModel {
    id: string;
    nomeCirugia: string;
    data: string;
    horaInicio: string;
    horaTermino: string;

    constructor(nomeCirurgia: string, id: string, data: string, hi: string, ht: string) {
        this.id = id;
        this.data = data;
        this.horaInicio = hi;
        this.horaTermino = ht;
        this.nomeCirugia = nomeCirurgia;
    }
}