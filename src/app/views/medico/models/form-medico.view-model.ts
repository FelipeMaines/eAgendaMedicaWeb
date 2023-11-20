export class FormMedicoViewModel{
    nome: string;
    crm: string;
    cpf: string;
    cep: string;
    telefone: string;
    email: string;
    foto?: string;

    constructor(nome: string, crm: string, telefone: string, email: string, cep: string, cpf:string,  foto: string)
    {
        this.crm = crm;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.foto = foto
        this.cep = cep;
        this.cpf = cpf;
    }
}