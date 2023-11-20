export class VisualizarPacienteViewModel {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    telefoneFamiliar: string;
    cep: string;
        
    constructor(id:string, nome: string, email: string, cpf: string, telefone: string, cep: string, telefoneFamiliar: string){
        this.id = id;
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.cep = cep;
        this.telefone = telefone;
        this.telefoneFamiliar = telefoneFamiliar;
    }
}