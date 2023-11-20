import { ListarConsultaViewModel } from "../../consulta/models/listar-consulta.view-model";

export class VisualizarMedicoViewModel {
    id: string;
    nome: string;
    crm: string;
    cpf: string;
    cep: string;
    telefone: string;
    email: string;
    foto?: string;
    horasTrabalhadas: string
    consultas: ListarConsultaViewModel[] = [];
    cirurgias: ListarConsultaViewModel[] = [];

    constructor(id:string, nome: string, crm: string, telefone: string, email: string, cep: string, cpf:string,  foto: string, horasTrabalhadas: string)
    {
        this.id = id;
        this.horasTrabalhadas = horasTrabalhadas;
        this.crm = crm;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.foto = foto
        this.cep = cep;
        this.cpf = cpf;
    }
}