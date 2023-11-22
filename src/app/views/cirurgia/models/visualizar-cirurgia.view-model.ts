import { ListarMedicoViewModel } from "../../medico/models/listar-medico.view-model";
import { ListarPacienteViewModel } from "../../paciente/models/listar-paciente.view-model";

export class VisualizarCirurgiaViewModel {
    id: string;
    nomeCirugia: string;
    medicos: ListarMedicoViewModel[];
    paciente: ListarPacienteViewModel;
    horaInicio: string;
    horaTermino: string;
    data: string;

    constructor(id: string, nomeCirurgia: string, medicos: ListarMedicoViewModel[], data: string, hi: string, ht: string,  paciente: ListarPacienteViewModel) {
        this.medicos = medicos;
        this.paciente = paciente;
        this.horaInicio = hi;
        this.horaTermino = ht;
        this.nomeCirugia = nomeCirurgia;
        this.id = id;
        this.data = data;
    }
}