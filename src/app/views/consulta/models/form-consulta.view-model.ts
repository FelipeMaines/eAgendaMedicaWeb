import { ListarMedicoViewModel } from "../../medico/models/listar-medico.view-model";
import { ListarPacienteViewModel } from "../../paciente/models/listar-paciente.view-model";

export class FormConsultaViewModel{
    data: string;
    horaInicio: string;
    horaTermino: string;
    medico: string;
    paciente: string;


    constructor(medico: string,paciente: string ,data: string, hi: string, ht: string)
    {
        this.medico = medico;
        this.paciente = paciente;
        this.data = data;
        this.horaInicio = hi;
        this.horaTermino = ht;
    }

}