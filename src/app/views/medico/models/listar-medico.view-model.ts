export class ListarMedicoViewModel {
    id: string;
    nome: string;
    crm: string;
    telefone: string;
    email: string;
    horasTrabalhadas: string;
    foto: string;

    constructor(id: string, nome: string, crm: string, telefone: string, email: string, horasTrabalhadas: string, foto: string)
    {
        this.id = id;
        this.crm = crm;
        this.nome = nome;
        this.telefone = telefone;
        this.email = email;
        this.horasTrabalhadas = horasTrabalhadas,
        this.foto = foto
    }
}