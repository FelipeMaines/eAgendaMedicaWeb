export class FormCirurgiaViewModel {
    nomeCirugia: string;
    medicos: string[];
    paciente: string;
    horaInicio: string;
    horaTermino: string;
    data: string;

    constructor(nomeCirurgia: string, medicos: string[], data: string, hi: string, ht: string,  paciente: string) {
        this.medicos = medicos;
        this.paciente = paciente;
        this.horaInicio = hi;
        this.horaTermino = ht;
        this.nomeCirugia = nomeCirurgia;
        this.data = data;
    }
}