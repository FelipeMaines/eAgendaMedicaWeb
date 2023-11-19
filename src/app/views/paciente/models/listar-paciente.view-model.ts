export class ListarPacienteViewModel {
    id: string;
    nome: string;
    telefone: string;
    email: string;

    constructor(Nome: string, Id: string, Telefone: string, Email: string){
        this.id = Id,
        this.nome = Nome,
        this.telefone = Telefone,
        this.email = Email
    }
}

