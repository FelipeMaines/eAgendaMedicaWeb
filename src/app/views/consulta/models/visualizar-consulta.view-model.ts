import { ListarMedicoViewModel } from "../../medico/models/listar-medico.view-model";
import { ListarPacienteComponent } from "../../paciente/listar-paciente/listar-paciente.component";
import { ListarPacienteViewModel } from "../../paciente/models/listar-paciente.view-model";

export class VisualizarConsultaViewModel{
    id: string
    data: string;
    horaInicio: string;
    horaTermino: string;
    medico: ListarMedicoViewModel;
    paciente: ListarPacienteViewModel;


    constructor(id: string, medico: ListarMedicoViewModel,paciente: ListarPacienteViewModel ,data: string, hi: string, ht: string)
    {
        this.id = id;
        this.medico = medico;
        this.paciente = paciente;
        this.data = data;
        this.horaInicio = hi;
        this.horaTermino = ht;
    }
}