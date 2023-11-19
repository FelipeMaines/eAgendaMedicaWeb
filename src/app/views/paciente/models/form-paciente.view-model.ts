export class FormPacienteViewModel
{
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    telefoneFamiliar: string;
    cep: string;


    
    constructor(nome: string, email: string, cpf: string, telefone: string, cep: string, telefoneFamiliar: string){
        this.nome = nome;
        this.email = email;
        this.cpf = cpf;
        this.cep = cep;
        this.telefone = telefone;
        this.telefoneFamiliar = telefoneFamiliar;
    }
}